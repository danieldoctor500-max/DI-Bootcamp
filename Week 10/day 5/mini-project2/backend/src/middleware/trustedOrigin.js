const config = require('../config')
const { AppError } = require('../helpers/errors')

function trustedOrigin(req, res, next) {
  const origin = req.get('origin')
  if (origin && origin !== config.clientOrigin) {
    return next(new AppError(403, 'This request origin is not allowed.'))
  }
  return next()
}

module.exports = trustedOrigin
