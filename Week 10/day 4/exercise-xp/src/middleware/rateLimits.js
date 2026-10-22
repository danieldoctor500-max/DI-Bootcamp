const { rateLimit } = require('express-rate-limit')

function createAuthLimiter(message) {
  return rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { error: message },
  })
}

module.exports = {
  loginLimiter: createAuthLimiter('Too many authentication attempts. Try again later.'),
  refreshLimiter: createAuthLimiter('Too many refresh attempts. Try again later.'),
}