const crypto = require('node:crypto')
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')
const users = require('../data/users')
const sessions = require('../data/refreshSessions')
const {
  ACCESS_TTL_SECONDS,
  REFRESH_TTL_SECONDS,
  createTokenPair,
  verifyRefreshToken,
} = require('../services/tokenService')

const router = express.Router()
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const USERNAME_PATTERN = /^[\p{L}\p{N}_-]{3,32}$/u
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{12,128}$/
const ACCESS_COOKIE = 'accessToken'
const REFRESH_COOKIE = 'refreshToken'

function cookieOptions(maxAge, path = '/') {
  return {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: 'strict',
    path,
    maxAge,
  }
}

function setTokenCookies(res, tokens) {
  res.cookie(ACCESS_COOKIE, tokens.accessToken, cookieOptions(ACCESS_TTL_SECONDS * 1000))
  res.cookie(REFRESH_COOKIE, tokens.refreshToken, cookieOptions(REFRESH_TTL_SECONDS * 1000, '/api/auth'))
}

function clearTokenCookies(res) {
  res.clearCookie(ACCESS_COOKIE, cookieOptions(0))
  res.clearCookie(REFRESH_COOKIE, cookieOptions(0, '/api/auth'))
}

function invalidRefresh(res) {
  clearTokenCookies(res)
  return res.status(401).json({ error: 'Refresh session is invalid or expired. Please log in again.' })
}

router.post('/register', async (req, res) => {
  const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : ''
  const username = typeof req.body.username === 'string' ? req.body.username.trim() : ''
  const password = typeof req.body.password === 'string' ? req.body.password : ''

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return res.status(400).json({ error: 'Enter a valid email address.' })
  }
  if (!USERNAME_PATTERN.test(username)) {
    return res.status(400).json({ error: 'Username must be 3–32 letters, numbers, underscores, or hyphens.' })
  }
  if (!PASSWORD_PATTERN.test(password)) {
    return res.status(400).json({
      error: 'Password must be 12–128 characters and include lowercase, uppercase, a number, and a symbol.',
    })
  }
  if (users.findByEmail(email)) return res.status(409).json({ error: 'An account with that email already exists.' })
  if (users.findByUsername(username)) return res.status(409).json({ error: 'That username is already taken.' })

  const user = {
    id: crypto.randomUUID(),
    email,
    username,
    passwordHash: await bcrypt.hash(password, 12),
    createdAt: new Date().toISOString(),
  }
  users.addUser(user)

  const tokens = createTokenPair(user)
  setTokenCookies(res, tokens)
  return res.status(201).json({ user: users.toPublicUser(user), expiresIn: ACCESS_TTL_SECONDS })
})

router.post('/login', async (req, res) => {
  const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : ''
  const password = typeof req.body.password === 'string' ? req.body.password : ''
  const user = users.findByEmail(email)

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: 'Email or password is incorrect.' })
  }

  const tokens = createTokenPair(user)
  setTokenCookies(res, tokens)
  return res.status(200).json({ user: users.toPublicUser(user), expiresIn: ACCESS_TTL_SECONDS })
})

router.post('/refresh', (req, res) => {
  const refreshToken = req.cookies[REFRESH_COOKIE]
  if (!refreshToken) return invalidRefresh(res)

  let payload
  try {
    payload = verifyRefreshToken(refreshToken)
  } catch {
    return invalidRefresh(res)
  }

  if (typeof payload === 'string' || typeof payload.sub !== 'string' || typeof payload.sid !== 'string') {
    return invalidRefresh(res)
  }

  const session = sessions.findSession(payload.sid)
  const user = users.findById(payload.sub)
  const validSession = session &&
    session.userId === payload.sub &&
    !session.revokedAt &&
    session.expiresAt > Date.now() &&
    sessions.matchesTokenHash(refreshToken, session.tokenHash)

  if (!validSession || !user) {
    sessions.revokeUserSessions(payload.sub)
    return invalidRefresh(res)
  }

  sessions.revokeSession(session.id)
  const tokens = createTokenPair(user)
  setTokenCookies(res, tokens)
  return res.status(200).json({ user: users.toPublicUser(user), expiresIn: ACCESS_TTL_SECONDS })
})

router.post('/logout', (req, res) => {
  const tokens = [req.cookies[REFRESH_COOKIE], req.cookies[ACCESS_COOKIE]].filter(Boolean)
  for (const token of tokens) {
    try {
      const payload = jwt.verify(token, token === req.cookies[REFRESH_COOKIE]
        ? config.refreshSecret
        : config.accessSecret, {
        issuer: config.issuer,
        audience: config.audience,
        algorithms: ['HS256'],
      })
      if (typeof payload !== 'string' && typeof payload.sid === 'string') {
        sessions.revokeSession(payload.sid)
      }
    } catch {
      // Logout remains idempotent even when a cookie has expired or been tampered with.
    }
  }

  clearTokenCookies(res)
  return res.status(204).end()
})

module.exports = router