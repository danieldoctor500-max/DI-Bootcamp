const express = require('express')
const users = require('../data/users')
const { authenticate } = require('../middleware/authenticate')

const router = express.Router()
const USERNAME_PATTERN = /^[\p{L}\p{N}_-]{3,32}$/u

router.use(authenticate)

router.get('/', (req, res) => {
  return res.status(200).json({ user: users.toPublicUser(req.auth.user) })
})

router.patch('/', (req, res) => {
  const username = typeof req.body.username === 'string' ? req.body.username.trim() : ''
  if (!USERNAME_PATTERN.test(username)) {
    return res.status(400).json({ error: 'Username must be 3–32 letters, numbers, underscores, or hyphens.' })
  }
  if (users.findByUsername(username, req.auth.user.id)) {
    return res.status(409).json({ error: 'That username is already taken.' })
  }

  req.auth.user.username = username
  return res.status(200).json({ user: users.toPublicUser(req.auth.user) })
})

module.exports = router