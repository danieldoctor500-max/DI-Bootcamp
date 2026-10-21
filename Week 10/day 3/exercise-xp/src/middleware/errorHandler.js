function notFound(req, res) {
  res.status(404).json({ error: 'Route not found.' })
}

function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error)

  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Request body must contain valid JSON.' })
  }

  console.error(error)
  return res.status(500).json({ error: 'An unexpected server error occurred.' })
}

module.exports = { errorHandler, notFound }