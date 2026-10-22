const comments = require('../models/comments')
const stories = require('../models/stories')
const { AppError } = require('../helpers/errors')
const { parseId } = require('../helpers/validation')

async function assertStoryExists(storyId) {
  if (!(await stories.exists(storyId))) throw new AppError(404, 'Story not found.')
}

async function list(req, res) {
  const storyId = parseId(req.params.storyId)
  if (!storyId) throw new AppError(400, 'Story ID must be a positive integer.')
  await assertStoryExists(storyId)
  return res.json({ comments: await comments.listForStory(storyId) })
}

async function create(req, res) {
  const storyId = parseId(req.params.storyId)
  if (!storyId) throw new AppError(400, 'Story ID must be a positive integer.')
  const content = typeof req.body?.content === 'string' ? req.body.content.trim() : ''
  if (!content || content.length > 2000) {
    throw new AppError(400, 'Comment must be between 1 and 2,000 characters.')
  }
  await assertStoryExists(storyId)
  const comment = await comments.create({ storyId, userId: req.user.id, content })
  return res.status(201).json({ comment: { ...comment, author: { id: req.user.id, username: req.user.username } } })
}

module.exports = { create, list }
