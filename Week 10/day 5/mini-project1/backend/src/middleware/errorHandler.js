const { AppError } = require('../helpers/errors')

function notFound(req, res, next) {
  next(new AppError(404, 'The requested endpoint was not found.'))
}

function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error)

  if (error.code === '23505') {
    return res.status(409).json({ message: 'That email or contributor already exists.' })
  }
  if (error.code === '23503') {
    return res.status(404).json({ message: 'The requested user or story was not found.' })
  }
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Request body must contain valid JSON.' })
  }
  if (error.type === 'entity.too.large') {
    return res.status(413).json({ message: 'Request body is too large.' })
  }

  if (error instanceof AppError) {
    return res.status(error.status).json({ message: error.message })
  }

  console.error('Unhandled request error:', error)
  return res.status(500).json({ message: 'Something went wrong. Please try again.' })
}

module.exports = { errorHandler, notFound }
