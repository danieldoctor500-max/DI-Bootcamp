const usersById = new Map()
const userIdByEmail = new Map()

function addUser(user) {
  usersById.set(user.id, user)
  userIdByEmail.set(user.email, user.id)
}

function findByEmail(email) {
  const userId = userIdByEmail.get(email)
  return userId ? usersById.get(userId) : undefined
}

function findById(userId) {
  return usersById.get(userId)
}

function findByUsername(username, exceptUserId = null) {
  const normalizedUsername = username.toLowerCase()
  return [...usersById.values()].find(
    (user) => user.id !== exceptUserId && user.username.toLowerCase() === normalizedUsername,
  )
}

function toPublicUser(user) {
  const { id, email, username, createdAt } = user
  return { id, email, username, createdAt }
}

module.exports = { addUser, findByEmail, findById, findByUsername, toPublicUser }