const crypto = require('node:crypto')
const jwt = require('jsonwebtoken')
const config = require('../config')

const ACCESS_TTL = '15m'
const REFRESH_TTL_SECONDS = 7 * 24 * 60 * 60
const ISSUER = 'storyweave-api'

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex')
}

function createAccessToken(user) {
  return jwt.sign({ username: user.username }, config.jwtSecret, {
    subject: String(user.id),
    expiresIn: ACCESS_TTL,
    issuer: ISSUER,
    audience: 'storyweave-client',
    algorithm: 'HS256',
  })
}

function createRefreshToken(userId, tokenId) {
  return jwt.sign({ tokenId }, config.refreshSecret, {
    subject: String(userId),
    expiresIn: REFRESH_TTL_SECONDS,
    issuer: ISSUER,
    audience: 'storyweave-client',
    algorithm: 'HS256',
  })
}

function verifyRefreshToken(token) {
  return jwt.verify(token, config.refreshSecret, {
    issuer: ISSUER,
    audience: 'storyweave-client',
    algorithms: ['HS256'],
  })
}

module.exports = {
  ACCESS_TTL,
  REFRESH_TTL_SECONDS,
  createAccessToken,
  createRefreshToken,
  hashToken,
  verifyRefreshToken,
}
