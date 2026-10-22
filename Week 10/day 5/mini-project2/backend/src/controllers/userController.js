const users = require('../models/users')
const { AppError } = require('../helpers/errors')

async function findByEmail(req, res) {
  const email = typeof req.query.email === 'string' ? req.query.email.trim().toLowerCase() : ''
  if (!email || email.length > 254) throw new AppError(400, 'Provide a valid email address.')
  const user = await users.findByEmailExact(email)
  if (!user) throw new AppError(404, 'No account was found with that email.')
  if (String(user.id) === String(req.user.id)) {
    throw new AppError(400, 'You are already the author of this story.')
  }
  return res.json({ user })
}

module.exports = { findByEmail }
