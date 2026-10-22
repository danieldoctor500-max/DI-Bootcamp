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

test('all advanced protected endpoints require authentication', async () => {
  const requests = [
    fetch(`${baseUrl}/api/comments/1`),
    fetch(`${baseUrl}/api/versions/1`),
    fetch(`${baseUrl}/api/profile/me`),
    fetch(`${baseUrl}/api/profile/me/avatar`, { method: 'POST' }),
    fetch(`${baseUrl}/api/stories/1/share`, { method: 'POST' }),
  ]
  const responses = await Promise.all(requests)
  assert.deepEqual(responses.map((response) => response.status), [401, 401, 401, 401, 401])
})

test('invalid public share tokens do not query story storage', async () => {
  const response = await fetch(`${baseUrl}/api/share/invalid`)
  assert.equal(response.status, 404)
})
