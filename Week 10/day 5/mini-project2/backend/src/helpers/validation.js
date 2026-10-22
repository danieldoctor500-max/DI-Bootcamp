const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateCredentials({ username, email, password }, registration = false) {
  if (registration && (typeof username !== 'string' || username.trim().length < 3 || username.trim().length > 50)) {
    return 'Username must be between 3 and 50 characters.'
  }
  if (typeof email !== 'string' || email.length > 254 || !EMAIL_PATTERN.test(email.trim())) {
    return 'Enter a valid email address.'
  }
  if (typeof password !== 'string' || password.length < 8 || password.length > 128) {
    return 'Password must be between 8 and 128 characters.'
  }
  return null
}

function parseId(value) {
  if (typeof value !== 'string' || !/^[1-9]\d*$/.test(value)) return null
  const id = Number(value)
  return Number.isSafeInteger(id) ? id : null
}

module.exports = { validateCredentials, parseId }
