const pool = require('../db/pool')

async function listForStory(storyId) {
  const result = await pool.query(
    `SELECT c.id, c.story_id, u.id AS user_id, u.username, u.email, c.created_at
     FROM contributors c JOIN users u ON u.id = c.user_id
     WHERE c.story_id = $1 ORDER BY u.username`,
    [storyId],
  )
  return result.rows
}

async function add(storyId, userId) {
  const result = await pool.query(
    `INSERT INTO contributors (story_id, user_id) VALUES ($1, $2)
     RETURNING id, story_id, user_id, created_at`,
    [storyId, userId],
  )
  return result.rows[0]
}

async function findById(id) {
  const result = await pool.query(
    'SELECT id, story_id FROM contributors WHERE id = $1',
    [id],
  )
  return result.rows[0] || null
}

async function remove(id) {
  const result = await pool.query('DELETE FROM contributors WHERE id = $1 RETURNING id', [id])
  return result.rowCount > 0
}

module.exports = { add, findById, listForStory, remove }
