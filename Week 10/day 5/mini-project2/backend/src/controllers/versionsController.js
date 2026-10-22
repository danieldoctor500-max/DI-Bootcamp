const stories = require('../models/stories')
const versions = require('../models/versions')
const { AppError } = require('../helpers/errors')
const { parseId } = require('../helpers/validation')

async function assertAuthor(storyId, userId) {
  if (!(await stories.exists(storyId))) throw new AppError(404, 'Story not found.')
  if (!(await stories.isAuthor(storyId, userId))) {
    throw new AppError(403, 'Only the story author can view or restore versions.')
  }
}

async function list(req, res) {
  const storyId = parseId(req.params.storyId)
  if (!storyId) throw new AppError(400, 'Story ID must be a positive integer.')
  await assertAuthor(storyId, req.user.id)
  return res.json({ versions: await versions.listForStory(storyId) })
}

async function restore(req, res) {
  const storyId = parseId(req.params.storyId)
  const versionId = parseId(String(req.body?.version_id ?? ''))
  if (!storyId || !versionId) throw new AppError(400, 'Story and version IDs must be positive integers.')
  await assertAuthor(storyId, req.user.id)
  const version = await versions.findForStory({ storyId, versionId })
  if (!version) throw new AppError(404, 'That story version was not found.')
  const story = await stories.restoreVersion({
    id: storyId,
    title: version.title,
    content: version.content,
    userId: req.user.id,
  })
  req.app.get('io')?.to(`story:${storyId}`).emit('story:updated', { story, restored: true })
  return res.json({ story })
}

module.exports = { list, restore }
