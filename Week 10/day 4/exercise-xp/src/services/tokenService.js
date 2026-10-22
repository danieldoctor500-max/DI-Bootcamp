const crypto = require('node:crypto')
const jwt = require('jsonwebtoken')
const config = require('../config')
const sessions = require('../data/refreshSessions')

const ACCESS_TTL_SECONDS = 15 * 60
const REFRESH_TTL_SECONDS = 7 * 24 * 60 * 60

function createTokenPair(user) {
  const sessionId = crypto.randomUUID()
  const claims = { sub: user.id, sid: sessionId }
  const signOptions = { issuer: config.issuer, audience: config.audience, algorithm: 'HS256' }
  const accessToken = jwt.sign(claims, config.accessSecret, {
    ...signOptions,
    expiresIn: ACCESS_TTL_SECONDS,
  })
  const refreshToken = jwt.sign(claims, config.refreshSecret, {
    ...signOptions,
    expiresIn: REFRESH_TTL_SECONDS,
  })

  sessions.addSession({
    id: sessionId,
    userId: user.id,
    tokenHash: sessions.hashToken(refreshToken),
    expiresAt: Date.now() + REFRESH_TTL_SECONDS * 1000,
    revokedAt: null,
  })

  return { accessToken, refreshToken }
}

function verifyAccessToken(token) {
  return jwt.verify(token, config.accessSecret, {
    issuer: config.issuer,
    audience: config.audience,
    algorithms: ['HS256'],
  })
}

function verifyRefreshToken(token) {
  return jwt.verify(token, config.refreshSecret, {
    issuer: config.issuer,
    audience: config.audience,
    algorithms: ['HS256'],
  })
}

module.exports = {
  ACCESS_TTL_SECONDS,
  REFRESH_TTL_SECONDS,
  createTokenPair,
  verifyAccessToken,
  verifyRefreshToken,
}