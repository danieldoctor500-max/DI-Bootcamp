const { after, before, test } = require('node:test')
const assert = require('node:assert/strict')

process.env.JWT_SECRET = 'test-jwt-secret-with-at-least-32-characters'
process.env.REFRESH_SECRET = 'test-refresh-secret-that-is-also-over-32-chars'
process.env.DATABASE_URL = 'postgresql://localhost/storyweave_test'
process.env.CLIENT_ORIGIN = 'http://localhost:5173'
process.env.NODE_ENV = 'test'

const app = require('../src/app')
const pool = require('../src/db/pool')
let server
let baseUrl

before(async () => {
  server = app.listen(0)
  await new Promise((resolve) => server.once('listening', resolve))
  baseUrl = `http://127.0.0.1:${server.address().port}`
})

after(async () => {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()))
  await pool.end()
})

test('health endpoint is public and reports service status', async () => {
  const response = await fetch(`${baseUrl}/api/health`)
  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), { status: 'ok' })
})

test('protected routes require a bearer access token', async () => {
  const response = await fetch(`${baseUrl}/api/stories`)
  assert.equal(response.status, 401)
  assert.match((await response.json()).message, /Sign in/)
})

test('cookie authentication rejects untrusted browser origins', async () => {
  const response = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: {
      origin: 'https://untrusted.example',
      'content-type': 'application/json',
    },
    body: JSON.stringify({ email: 'reader@example.test', password: 'valid-password' }),
  })
  assert.equal(response.status, 403)
})
