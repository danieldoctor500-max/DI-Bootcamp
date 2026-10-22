const crypto = require('node:crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')
const users = require('../models/users')
const refreshTokens = require('../models/refreshTokens')
const { AppError } = require('../helpers/errors')
const { validateCredentials } = require('../helpers/validation')
const {
  ACCESS_TTL,
  REFRESH_TTL_SECONDS,
  createAccessToken,
  createRefreshToken,
  hashToken,
  verifyRefreshToken,
} = require('../helpers/tokens')

const REFRESH_COOKIE = 'refreshToken'

function cookieOptions() {
  return {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: config.isProduction ? 'none' : 'lax',
    path: '/api/auth',
    maxAge: REFRESH_TTL_SECONDS * 1000,
  }
}

function clearRefreshCookie(res) {
  res.clearCookie(REFRESH_COOKIE, cookieOptions())
}

function createSession(user) {
  const id = crypto.randomUUID()
  const refreshToken = createRefreshToken(user.id, id)
  return {
    id,
    refreshToken,
    tokenHash: hashToken(refreshToken),
    expiresAt: new Date(Date.now() + REFRESH_TTL_SECONDS * 1000),
    accessToken: createAccessToken(user),
    expiresIn: ACCESS_TTL,
  }
}

async function issueSession(user, res) {
  const session = createSession(user)
  await refreshTokens.create({
    id: session.id,
    userId: user.id,
    tokenHash: session.tokenHash,
    expiresAt: session.expiresAt,
  })
  res.cookie(REFRESH_COOKIE, session.refreshToken, cookieOptions())
  return { accessToken: session.accessToken, expiresIn: session.expiresIn }
}

function publicUser(user) {
  return { id: String(user.id), username: user.username, email: user.email }
}

async function register(req, res) {
  const input = req.body || {}
  const validationError = validateCredentials(input, true)
  if (validationError) throw new AppError(400, validationError)

  const user = await users.create({
    username: input.username.trim(),
    email: input.email.trim().toLowerCase(),
    passwordHash: await bcrypt.hash(input.password, 12),
  })
  const tokens = await issueSession(user, res)
  return res.status(201).json({ user: publicUser(user), ...tokens })
}

async function login(req, res) {
  const input = req.body || {}
  const validationError = validateCredentials(input)
  if (validationError) throw new AppError(400, validationError)

  const user = await users.findByEmail(input.email.trim().toLowerCase())
  if (!user || !(await bcrypt.compare(input.password, user.password_hash))) {
    throw new AppError(401, 'Email or password is incorrect.')
  }
  const tokens = await issueSession(user, res)
  return res.json({ user: publicUser(user), ...tokens })
}

async function refresh(req, res) {
  const token = req.cookies[REFRESH_COOKIE]
  if (!token) throw new AppError(401, 'Your session has expired. Please sign in again.')

  let payload
  try {
    payload = verifyRefreshToken(token)
  } catch {
    clearRefreshCookie(res)
    throw new AppError(401, 'Your session has expired. Please sign in again.')
  }
  if (
    typeof payload === 'string' ||
    typeof payload.sub !== 'string' ||
    typeof payload.tokenId !== 'string'
  ) {
    clearRefreshCookie(res)
    throw new AppError(401, 'Your session has expired. Please sign in again.')
  }

  const stored = await refreshTokens.findByHash(hashToken(token))
  if (!stored || stored.id !== payload.tokenId || String(stored.user_id) !== payload.sub) {
    clearRefreshCookie(res)
    throw new AppError(401, 'Your session has expired. Please sign in again.')
  }
  if (stored.revoked_at) {
    await refreshTokens.revokeAllForUser(stored.user_id)
    clearRefreshCookie(res)
    throw new AppError(401, 'This refresh token has already been used. Please sign in again.')
  }

  const user = await users.findPublicById(stored.user_id)
  if (!user) {
    clearRefreshCookie(res)
    throw new AppError(401, 'Your session is no longer valid. Please sign in again.')
  }
  const session = createSession(user)
  const rotated = await refreshTokens.rotate({
    currentId: stored.id,
    id: session.id,
    userId: user.id,
    tokenHash: session.tokenHash,
    expiresAt: session.expiresAt,
  })
  if (!rotated) {
    await refreshTokens.revokeAllForUser(user.id)
    clearRefreshCookie(res)
    throw new AppError(401, 'Your session is no longer valid. Please sign in again.')
  }
  res.cookie(REFRESH_COOKIE, session.refreshToken, cookieOptions())
  return res.json({
    user: publicUser(user),
    accessToken: session.accessToken,
    expiresIn: session.expiresIn,
  })
}

async function logout(req, res) {
  const token = req.cookies[REFRESH_COOKIE]
  if (token) {
    let isValid = false
    try {
      jwt.verify(token, config.refreshSecret, {
        issuer: 'storyweave-api',
        audience: 'storyweave-client',
        algorithms: ['HS256'],
      })
      isValid = true
    } catch {
      // Logout is idempotent; an expired or invalid cookie needs no server-side action.
    }
    if (isValid) await refreshTokens.revokeByHash(hashToken(token))
  }
  clearRefreshCookie(res)
  return res.status(204).end()
}

async function me(req, res) {
  const user = await users.findPublicById(req.user.id)
  if (!user) throw new AppError(401, 'Your account is no longer available.')
  return res.json({ user: publicUser(user) })
}

module.exports = { login, logout, me, refresh, register }
