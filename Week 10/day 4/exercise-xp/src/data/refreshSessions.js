const crypto = require('node:crypto')

const sessionsById = new Map()

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest()
}

function matchesTokenHash(token, expectedHash) {
  if (!expectedHash) return false
  return crypto.timingSafeEqual(hashToken(token), expectedHash)
}

function addSession(session) {
  sessionsById.set(session.id, session)
}

function findSession(sessionId) {
  return sessionsById.get(sessionId)
}

function revokeSession(sessionId) {
  const session = sessionsById.get(sessionId)
  if (session) session.revokedAt = Date.now()
}

function revokeUserSessions(userId) {
  for (const session of sessionsById.values()) {
    if (session.userId === userId && !session.revokedAt) session.revokedAt = Date.now()
  }
}

module.exports = {
  addSession,
  findSession,
  hashToken,
  matchesTokenHash,
  revokeSession,
  revokeUserSessions,
}