const http = require('node:http')
const app = require('./app')
const pool = require('./db/pool')
const config = require('./config')
const { attachRealtime } = require('./realtime')

const server = http.createServer(app)
const io = attachRealtime(server, app)

server.listen(config.port, () => {
  console.log(`StoryWeave API listening on port ${config.port}`)
})

async function shutdown() {
  io.close(async () => {
    await pool.end()
  })
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
