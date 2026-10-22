const { before, after, test } = require('node:test')
const assert = require('node:assert/strict')

process.env.JWT_ACCESS_SECRET = 'test-access-secret-with-at-least-32-characters'
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret-that-is-also-over-32-characters'
process.env.NODE_ENV = 'test'

const app = require('../src/app')
let server
let baseUrl

before(async () => {
  server = app.listen(0)
  await new Promise((resolve) => server.once('listening', resolve))
  baseUrl = `http://127.0.0.1:${server.address().port}`
})

after(async () => {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()))
})

function getCookiePairs(response) {
  const cookies = typeof response.headers.getSetCookie === 'function'
    ? response.headers.getSetCookie()
    : (response.headers.get('set-cookie') ?? '').split(/, (?=[^;,]+=)/)
  return cookies.map((cookie) => cookie.split(';', 1)[0]).filter(Boolean)
}

function mergeCookies(...cookieGroups) {
  const values = new Map()
  for (const pair of cookieGroups.flat()) {
    const separator = pair.indexOf('=')
    values.set(pair.slice(0, separator), pair.slice(separator + 1))
  }
  return [...values].map(([key, value]) => `${key}=${value}`).join('; ')
}

async function post(path, body, cookie = '') {
  return fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(cookie ? { cookie } : {}),
    },
    body: JSON.stringify(body),
  })
}

test('registration, protected profile, refresh rotation, reuse revocation, and logout', async () => {
  const suffix = crypto.randomUUID()
  const email = `reader-${suffix}@example.test`
  const username = `reader_${suffix.slice(0, 8)}`
  const password = 'Reader123!Strong'

  const invalidRegistration = await post('/api/auth/register', {
    email,
    username,
    password: 'weak',
  })
  assert.equal(invalidRegistration.status, 400)

  const registration = await post('/api/auth/register', { email, username, password })
  assert.equal(registration.status, 201)
  const registeredUser = (await registration.json()).user
  assert.equal(registeredUser.email, email)
  assert.equal('passwordHash' in registeredUser, false)
  const initialCookies = getCookiePairs(registration)
  assert.equal(initialCookies.length, 2)
  assert.ok(registration.headers.getSetCookie().every((cookie) => /HttpOnly/i.test(cookie)))
  let cookie = mergeCookies(initialCookies)

  const profile = await fetch(`${baseUrl}/api/profile`, { headers: { cookie } })
  assert.equal(profile.status, 200)
  assert.equal((await profile.json()).user.username, username)

  const update = await fetch(`${baseUrl}/api/profile`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json', cookie },
    body: JSON.stringify({ username: `${username}_updated` }),
  })
  assert.equal(update.status, 200)

  const refresh = await post('/api/auth/refresh', {}, cookie)
  assert.equal(refresh.status, 200)
  const rotatedCookies = getCookiePairs(refresh)
  assert.equal(rotatedCookies.length, 2)
  const rotatedCookie = mergeCookies(rotatedCookies)

  const replay = await post('/api/auth/refresh', {}, cookie)
  assert.equal(replay.status, 401)

  const revokedProfile = await fetch(`${baseUrl}/api/profile`, {
    headers: { cookie: rotatedCookie },
  })
  assert.equal(revokedProfile.status, 401)

  const login = await post('/api/auth/login', { email, password })
  assert.equal(login.status, 200)
  cookie = mergeCookies(getCookiePairs(login))
  const logout = await post('/api/auth/logout', {}, cookie)
  assert.equal(logout.status, 204)

  const afterLogout = await fetch(`${baseUrl}/api/profile`, { headers: { cookie } })
  assert.equal(afterLogout.status, 401)
})