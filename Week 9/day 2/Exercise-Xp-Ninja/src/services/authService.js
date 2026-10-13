const USERS_KEY = 'daymark.auth.users'
const SESSION_KEY = 'daymark.auth.session'
const TODOS_KEY_PREFIX = 'daymark.todos.'
const PASSWORD_ITERATIONS = 120000
const CATEGORY_SEEDS = [
  { id: 'personal', name: 'Personal' },
  { id: 'work', name: 'Work' },
  { id: 'learning', name: 'Learning' },
]

function getStorage(name) {
  const storage = globalThis[name]
  if (!storage) {
    throw new Error('Browser storage is unavailable. Enable storage and try again.')
  }
  return storage
}

function readUsers() {
  const value = getStorage('localStorage').getItem(USERS_KEY)
  if (value === null) return []

  let users
  try {
    users = JSON.parse(value)
  } catch {
    throw new Error('Saved account data could not be read. Clear this demo’s site data and try again.')
  }

  if (!Array.isArray(users)) {
    throw new Error('Saved account data is invalid. Clear this demo’s site data and try again.')
  }
  if (
    !users.every(
      (user) =>
        user &&
        ['id', 'name', 'email', 'salt', 'passwordHash'].every(
          (key) => typeof user[key] === 'string',
        ),
    )
  ) {
    throw new Error('Saved account data is invalid. Clear this demo’s site data and try again.')
  }
  return users
}

function encodeBase64(bytes) {
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary)
}

function decodeBase64(value) {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0))
}

async function hashPassword(password, salt) {
  if (!globalThis.crypto?.subtle) {
    throw new Error('Secure password hashing is unavailable in this browser.')
  }

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  )
  const digest = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt,
      iterations: PASSWORD_ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    256,
  )
  return new Uint8Array(digest)
}

function matchesHash(actual, expected) {
  if (actual.length !== expected.length) return false
  let difference = 0
  for (let index = 0; index < actual.length; index += 1) {
    difference |= actual[index] ^ expected[index]
  }
  return difference === 0
}

function makeCategories(savedCategories = []) {
  return CATEGORY_SEEDS.map((seed) => {
    const saved = savedCategories.find((category) => category?.id === seed.id)
    const todos = Array.isArray(saved?.todos)
      ? saved.todos
          .filter(
            (todo) =>
              typeof todo?.id === 'string' &&
              typeof todo?.text === 'string' &&
              typeof todo?.completed === 'boolean',
          )
          .map(({ id, text, completed }) => ({ id, text, completed }))
      : []
    return { ...seed, todos }
  })
}

function readTodos(userId) {
  const value = getStorage('localStorage').getItem(`${TODOS_KEY_PREFIX}${userId}`)
  if (value === null) return makeCategories()

  let savedCategories
  try {
    savedCategories = JSON.parse(value)
  } catch {
    throw new Error('Your saved todo list could not be read. Clear its saved data and try again.')
  }
  if (!Array.isArray(savedCategories)) {
    throw new Error('Your saved todo list is invalid. Clear its saved data and try again.')
  }
  return makeCategories(savedCategories)
}

function saveSession(user, categories) {
  const token = crypto.randomUUID()
  getStorage('sessionStorage').setItem(
    SESSION_KEY,
    JSON.stringify({ token, userId: user.id }),
  )
  return { user, token, categories }
}

function validateCredentials(email, password) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Enter a valid email address.')
  }
  if (typeof password !== 'string' || password.length < 8) {
    throw new Error('Your password must be at least 8 characters.')
  }
}

export async function registerAccount({ name, email, password }) {
  const displayName = name.trim()
  const normalizedEmail = email.trim().toLowerCase()

  if (displayName.length < 2 || displayName.length > 60) {
    throw new Error('Enter a name between 2 and 60 characters.')
  }
  validateCredentials(normalizedEmail, password)
  if (!/[a-z]/i.test(password) || !/\d/.test(password)) {
    throw new Error('Use at least one letter and one number in your password.')
  }

  const users = readUsers()
  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error('An account with that email already exists. Try signing in.')
  }

  const salt = crypto.getRandomValues(new Uint8Array(16))
  const passwordHash = await hashPassword(password, salt)
  const user = {
    id: crypto.randomUUID(),
    name: displayName,
    email: normalizedEmail,
    salt: encodeBase64(salt),
    passwordHash: encodeBase64(passwordHash),
  }

  getStorage('localStorage').setItem(USERS_KEY, JSON.stringify([...users, user]))
  return saveSession(
    { id: user.id, name: user.name, email: user.email },
    makeCategories(),
  )
}

export async function loginAccount({ email, password }) {
  const normalizedEmail = email.trim().toLowerCase()
  validateCredentials(normalizedEmail, password)

  const user = readUsers().find((item) => item.email === normalizedEmail)
  if (!user) throw new Error('Email or password is incorrect.')

  let salt
  let expectedHash
  try {
    salt = decodeBase64(user.salt)
    expectedHash = decodeBase64(user.passwordHash)
  } catch {
    throw new Error('Saved account data is invalid. Clear this demo’s site data and try again.')
  }

  const passwordHash = await hashPassword(password, salt)
  if (!matchesHash(passwordHash, expectedHash)) {
    throw new Error('Email or password is incorrect.')
  }

  const publicUser = { id: user.id, name: user.name, email: user.email }
  return saveSession(publicUser, readTodos(user.id))
}

export function restoreSession() {
  const value = getStorage('sessionStorage').getItem(SESSION_KEY)
  if (value === null) return null

  let session
  try {
    session = JSON.parse(value)
  } catch {
    throw new Error('Your saved sign-in could not be read. Please sign in again.')
  }

  const user = readUsers().find((item) => item.id === session?.userId)
  if (!user || typeof session?.token !== 'string') {
    getStorage('sessionStorage').removeItem(SESSION_KEY)
    return null
  }

  return {
    user: { id: user.id, name: user.name, email: user.email },
    token: session.token,
    categories: readTodos(user.id),
  }
}

export function endSession() {
  getStorage('sessionStorage').removeItem(SESSION_KEY)
}

export function saveUserTodos(userId, categories) {
  getStorage('localStorage').setItem(
    `${TODOS_KEY_PREFIX}${userId}`,
    JSON.stringify(categories),
  )
}

export function getEmptyCategories() {
  return makeCategories()
}
