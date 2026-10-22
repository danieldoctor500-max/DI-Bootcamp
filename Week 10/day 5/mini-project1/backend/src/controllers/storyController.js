const stories = require('../models/stories')
const { AppError } = require('../helpers/errors')
const { parseId } = require('../helpers/validation')

function readStoryFields(body, existing) {
  const title = body.title === undefined ? existing?.title : body.title
  const content = body.content === undefined ? existing?.content : body.content
  if (typeof title !== 'string' || !title.trim() || title.trim().length > 255) {
    throw new AppError(400, 'Title is required and must be at most 255 characters.')
  }
  if (typeof content !== 'string' || !content.trim() || content.trim().length > 50000) {
    throw new AppError(400, 'Content is required and must be at most 50,000 characters.')
  }
  return { title: title.trim(), content: content.trim() }
}

async function list(req, res) {
  return res.json({ stories: await stories.listAll() })
}

async function create(req, res) {
  const { title, content } = readStoryFields(req.body || {})
  const story = await stories.create({ title, content, authorId: req.user.id })
  return res.status(201).json({ story })
}

async function update(req, res) {
  const id = parseId(req.params.id)
  if (!id) throw new AppError(400, 'Story ID must be a positive integer.')
  const existing = await stories.findById(id)
  if (!existing) throw new AppError(404, 'Story not found.')
  if (!(await stories.canEdit(id, req.user.id))) {
    throw new AppError(403, 'Only the author or a contributor can edit this story.')
  }
  const { title, content } = readStoryFields(req.body || {}, existing)
  return res.json({ story: await stories.update({ id, title, content }) })
}

async function remove(req, res) {
  const id = parseId(req.params.id)
  if (!id) throw new AppError(400, 'Story ID must be a positive integer.')
  if (!(await stories.isAuthor(id, req.user.id))) {
    const story = await stories.findById(id)
    if (!story) throw new AppError(404, 'Story not found.')
    throw new AppError(403, 'Only the story author can delete this story.')
  }
  await stories.remove(id)
  return res.status(204).end()
}

module.exports = { create, list, readStoryFields, remove, update }
