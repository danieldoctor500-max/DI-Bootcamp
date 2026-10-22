const app = require('./app')
const pool = require('./db/pool')
const config = require('./config')

const server = app.listen(config.port, () => {
  console.log(`StoryWeave API listening on port ${config.port}`)
})

async function shutdown() {
  server.close(async (error) => {
    if (error) {
      console.error('Failed to close the HTTP server:', error)
      process.exitCode = 1
    }
    await pool.end()
  })
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
