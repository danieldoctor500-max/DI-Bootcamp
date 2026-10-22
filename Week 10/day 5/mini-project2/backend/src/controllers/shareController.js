const crypto = require('node:crypto')
const stories = require('../models/stories')
const shareLinks = require('../models/shareLinks')
const { hashToken } = require('../helpers/tokens')
const { AppError } = require('../helpers/errors')
const { parseId } = require('../helpers/validation')

async function create(req, res) {
  const storyId = parseId(req.params.storyId)
  if (!storyId) throw new AppError(400, 'Story ID must be a positive integer.')
  if (!(await stories.exists(storyId))) throw new AppError(404, 'Story not found.')
  if (!(await stories.canEdit(storyId, req.user.id))) {
    throw new AppError(403, 'You do not have access to this story.')
  }
  const token = crypto.randomBytes(32).toString('base64url')
  await shareLinks.create({ storyId, tokenHash: hashToken(token), userId: req.user.id })
  const origin = process.env.PUBLIC_APP_ORIGIN || req.get('origin') || req.protocol + '://' + req.get('host')
  return res.status(201).json({ url: `${origin.replace(/\/$/, '')}/share/${token}` })
}

async function read(req, res) {
  if (!/^[A-Za-z0-9_-]{40,60}$/.test(req.params.token)) {
    throw new AppError(404, 'This share link is invalid or has expired.')
  }
  const story = await shareLinks.findByHash(hashToken(req.params.token))
  if (!story) throw new AppError(404, 'This share link is invalid or has expired.')
  return res.json({ story })
}

module.exports = { create, read }
