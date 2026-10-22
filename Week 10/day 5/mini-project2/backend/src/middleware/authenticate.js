const jwt = require('jsonwebtoken')
const config = require('../config')
const { AppError } = require('../helpers/errors')

function authenticate(req, res, next) {
  const authorization = req.get('authorization')
  const match = typeof authorization === 'string' && authorization.match(/^Bearer\s+(.+)$/i)
  if (!match) return next(new AppError(401, 'Sign in to access this resource.'))

  try {
    const payload = jwt.verify(match[1], config.jwtSecret, {
      issuer: 'storyweave-api',
      audience: 'storyweave-client',
      algorithms: ['HS256'],
    })
    if (typeof payload === 'string' || typeof payload.sub !== 'string') {
      throw new Error('Invalid token payload.')
    }
    req.user = { id: payload.sub, username: payload.username }
    return next()
  } catch {
    return next(new AppError(401, 'Your session has expired. Please sign in again.'))
  }
}

module.exports = authenticate
