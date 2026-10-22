const contributors = require('../models/contributors')
const stories = require('../models/stories')
const { AppError } = require('../helpers/errors')
const { parseId } = require('../helpers/validation')

async function add(req, res) {
  const storyId = parseId(String(req.body?.story_id ?? ''))
  const userId = parseId(String(req.body?.user_id ?? ''))
  if (!storyId || !userId) {
    throw new AppError(400, 'story_id and user_id must be positive integers.')
  }
  if (!(await stories.findById(storyId))) throw new AppError(404, 'Story not found.')
  if (!(await stories.isAuthor(storyId, req.user.id))) {
    throw new AppError(403, 'Only the story author can add contributors.')
  }
  const contributor = await contributors.add(storyId, userId)
  return res.status(201).json({ contributor })
}

async function list(req, res) {
  const storyId = parseId(req.params.story_id)
  if (!storyId) throw new AppError(400, 'Story ID must be a positive integer.')
  if (!(await stories.findById(storyId))) throw new AppError(404, 'Story not found.')
  if (!(await stories.canEdit(storyId, req.user.id))) {
    throw new AppError(403, 'You do not have access to this story.')
  }
  return res.json({ contributors: await contributors.listForStory(storyId) })
}

async function remove(req, res) {
  const id = parseId(req.params.id)
  if (!id) throw new AppError(400, 'Contributor ID must be a positive integer.')
  const contributor = await contributors.findById(id)
  if (!contributor) throw new AppError(404, 'Contributor not found.')
  if (!(await stories.isAuthor(contributor.story_id, req.user.id))) {
    throw new AppError(403, 'Only the story author can remove contributors.')
  }
  await contributors.remove(id)
  return res.status(204).end()
}

module.exports = { add, list, remove }
