const users = require('../data/users')
const sessions = require('../data/refreshSessions')
const { verifyAccessToken } = require('../services/tokenService')

function authenticate(req, res, next) {
  const bearerToken = req.get('authorization')?.match(/^Bearer\s+(.+)$/i)?.[1]
  const token = req.cookies.accessToken || bearerToken
  if (!token) return res.status(401).json({ error: 'Authentication required.' })

  try {
    const payload = verifyAccessToken(token)
    if (typeof payload === 'string' || typeof payload.sub !== 'string' || typeof payload.sid !== 'string') {
      return res.status(401).json({ error: 'Invalid access token.' })
    }

    const session = sessions.findSession(payload.sid)
    const user = users.findById(payload.sub)
    if (!session || session.userId !== payload.sub || session.revokedAt || !user) {
      return res.status(401).json({ error: 'Session is no longer active.' })
    }

    req.auth = { user, sessionId: session.id }
    return next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired access token.' })
  }
}

module.exports = { authenticate }