const comments = require('../models/comments')
const stories = require('../models/stories')
const { AppError } = require('../helpers/errors')
const { parseId } = require('../helpers/validation')

const ALLOWED_REACTIONS = new Set(['heart', 'laugh', 'sparkle'])

async function getStory(storyId) {
  const story = await stories.findById(storyId)
  if (!story) throw new AppError(404, 'Story not found.')
  return story
}

async function list(req, res) {
  const storyId = parseId(req.params.story_id)
  if (!storyId) throw new AppError(400, 'Story ID must be a positive integer.')
  const story = await getStory(storyId)
  return res.json({
    comments: story.comments_enabled
      ? await comments.listForStory(storyId, req.user.id)
      : [],
    commentsEnabled: story.comments_enabled,
  })
}

async function create(req, res) {
  const storyId = parseId(String(req.body?.story_id ?? ''))
  const content = typeof req.body?.comment_text === 'string'
    ? req.body.comment_text.trim()
    : typeof req.body?.content === 'string'
      ? req.body.content.trim()
      : ''
  if (!storyId) throw new AppError(400, 'story_id must be a positive integer.')
  if (!content || content.length > 2000) {
    throw new AppError(400, 'Comment must be between 1 and 2,000 characters.')
  }
  const story = await getStory(storyId)
  if (!story.comments_enabled) throw new AppError(403, 'Comments are disabled for this story.')
  const comment = await comments.create({ storyId, userId: req.user.id, content })
  return res.status(201).json({
    comment: {
      ...comment,
      author: { id: req.user.id, username: req.user.username },
      reactions: [],
    },
  })
}

async function update(req, res) {
  const commentId = parseId(req.params.id)
  if (!commentId) throw new AppError(400, 'Comment ID must be a positive integer.')
  const content = typeof req.body?.comment_text === 'string'
    ? req.body.comment_text.trim()
    : typeof req.body?.content === 'string'
      ? req.body.content.trim()
      : ''
  if (!content || content.length > 2000) {
    throw new AppError(400, 'Comment must be between 1 and 2,000 characters.')
  }
  const existing = await comments.findById(commentId)
  if (!existing) throw new AppError(404, 'Comment not found.')
  if (!existing.comments_enabled) throw new AppError(403, 'Comments are disabled for this story.')
  if (existing.user_id !== req.user.id) throw new AppError(403, 'Only the comment author can edit it.')
  await comments.update({ id: commentId, content })
  const comment = (await comments.listForStory(existing.story_id, req.user.id))
    .find((item) => item.id === String(commentId))
  return res.json({ comment })
}

async function remove(req, res) {
  const commentId = parseId(req.params.id)
  if (!commentId) throw new AppError(400, 'Comment ID must be a positive integer.')
  const existing = await comments.findById(commentId)
  if (!existing) throw new AppError(404, 'Comment not found.')
  if (existing.user_id !== req.user.id && existing.story_author_id !== req.user.id) {
    throw new AppError(403, 'Only the comment author or story author can delete it.')
  }
  await comments.remove(commentId)
  return res.status(204).end()
}

async function toggleReaction(req, res) {
  const commentId = parseId(req.params.id)
  if (!commentId) throw new AppError(400, 'Comment ID must be a positive integer.')
  const reaction = req.body?.reaction
  if (typeof reaction !== 'string' || !ALLOWED_REACTIONS.has(reaction)) {
    throw new AppError(400, 'Choose a supported reaction.')
  }
  const existing = await comments.findById(commentId)
  if (!existing) throw new AppError(404, 'Comment not found.')
  if (!existing.comments_enabled) throw new AppError(403, 'Reactions are disabled for this story.')
  await getStory(existing.story_id)
  const active = await comments.toggleReaction({ commentId, userId: req.user.id, reaction })
  return res.json({ reaction, active })
}

module.exports = { create, list, remove, toggleReaction, update }
