const { after, before, test } = require('node:test')
const assert = require('node:assert/strict')
const http = require('node:http')
const jwt = require('jsonwebtoken')
const { io: connectSocket } = require('socket.io-client')

process.env.JWT_SECRET = 'test-jwt-secret-with-at-least-32-characters'
process.env.REFRESH_SECRET = 'test-refresh-secret-that-is-also-over-32-chars'
process.env.DATABASE_URL = 'postgresql://localhost/storyweave_test'
process.env.CLIENT_ORIGIN = 'http://localhost:5173'
process.env.NODE_ENV = 'test'

const app = require('../src/app')
const pool = require('../src/db/pool')
const config = require('../src/config')
const { attachRealtime } = require('../src/realtime')
let server
let ioServer
let baseUrl

before(async () => {
  server = http.createServer(app)
  ioServer = attachRealtime(server, app)
  server.listen(0)
  await new Promise((resolve) => server.once('listening', resolve))
  baseUrl = `http://127.0.0.1:${server.address().port}`
})

after(async () => {
  await new Promise((resolve) => ioServer.close(resolve))
  await pool.end()
})

test('websocket connections reject missing and invalid JWTs', async () => {
  const socket = connectSocket(baseUrl, { transports: ['websocket'], reconnection: false })
  const error = await new Promise((resolve, reject) => {
    socket.once('connect', () => reject(new Error('Unauthenticated socket unexpectedly connected.')))
    socket.once('connect_error', resolve)
    setTimeout(() => reject(new Error('Socket authentication did not complete.')), 3000)
  })
  socket.close()
  assert.match(error.message, /Authentication required/)
})

test('websocket accepts a valid short-lived access JWT', async () => {
  const accessToken = jwt.sign({ username: 'Reader' }, config.jwtSecret, {
    subject: '1',
    expiresIn: '1m',
    issuer: 'storyweave-api',
    audience: 'storyweave-client',
    algorithm: 'HS256',
  })
  const socket = connectSocket(baseUrl, {
    auth: { accessToken },
    transports: ['websocket'],
    reconnection: false,
  })
  await new Promise((resolve, reject) => {
    socket.once('connect', resolve)
    socket.once('connect_error', reject)
    setTimeout(() => reject(new Error('Authenticated socket did not connect.')), 3000)
  })
  assert.equal(socket.connected, true)
  socket.close()
})
