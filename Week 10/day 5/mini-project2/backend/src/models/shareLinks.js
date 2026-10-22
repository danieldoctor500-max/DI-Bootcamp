const pool = require('../db/pool')

async function create({ storyId, tokenHash, userId }) {
  const result = await pool.query(
    `INSERT INTO share_links (story_id, token_hash, created_by)
     VALUES ($1, $2, $3)
     RETURNING id::text, story_id::text, created_at`,
    [storyId, tokenHash, userId],
  )
  return result.rows[0]
}

async function findByHash(tokenHash) {
  const result = await pool.query(
    `SELECT s.id::text, s.title, s.content, s.updated_at,
       json_build_object('id', u.id::text, 'username', u.username) AS author
     FROM share_links l JOIN stories s ON s.id = l.story_id
     JOIN users u ON u.id = s.author_id
     WHERE l.token_hash = $1 AND l.revoked_at IS NULL`,
    [tokenHash],
  )
  return result.rows[0] || null
}

module.exports = { create, findByHash }
