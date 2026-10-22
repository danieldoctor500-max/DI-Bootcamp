const pool = require('../db/pool')

async function listForStory(storyId) {
  const result = await pool.query(
    `SELECT v.id::text, v.story_id::text, v.title, v.content, v.created_at,
       json_build_object('id', u.id::text, 'username', u.username) AS author
     FROM story_versions v JOIN users u ON u.id = v.user_id
     WHERE v.story_id = $1 ORDER BY v.created_at DESC, v.id DESC`,
    [storyId],
  )
  return result.rows
}

async function findForStory({ versionId, storyId }) {
  const result = await pool.query(
    `SELECT id::text, story_id::text, title, content
     FROM story_versions WHERE id = $1 AND story_id = $2`,
    [versionId, storyId],
  )
  return result.rows[0] || null
}

module.exports = { findForStory, listForStory }
