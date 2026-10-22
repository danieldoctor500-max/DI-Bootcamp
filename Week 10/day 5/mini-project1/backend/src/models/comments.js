const pool = require('../db/pool')

async function listForStory(storyId) {
  const result = await pool.query(
    `SELECT c.id, c.story_id, c.content, c.created_at,
       json_build_object('id', u.id::text, 'username', u.username) AS author
     FROM comments c JOIN users u ON u.id = c.user_id
     WHERE c.story_id = $1 ORDER BY c.created_at`,
    [storyId],
  )
  return result.rows
}

async function create({ storyId, userId, content }) {
  const result = await pool.query(
    `INSERT INTO comments (story_id, user_id, content)
     VALUES ($1, $2, $3)
     RETURNING id, story_id, content, created_at`,
    [storyId, userId, content],
  )
  return result.rows[0]
}

module.exports = { create, listForStory }
