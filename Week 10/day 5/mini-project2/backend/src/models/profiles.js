const pool = require('../db/pool')

async function getByUserId(userId) {
  const result = await pool.query(
    `SELECT u.id::text, u.username, u.email, u.avatar_url, u.created_at,
       COALESCE((
         SELECT json_agg(json_build_object('id', s.id::text, 'title', s.title, 'updated_at', s.updated_at)
                         ORDER BY s.updated_at DESC)
         FROM stories s WHERE s.author_id = u.id
       ), '[]'::json) AS authored_stories,
       COALESCE((
         SELECT json_agg(json_build_object('id', s.id::text, 'title', s.title, 'updated_at', s.updated_at)
                         ORDER BY s.updated_at DESC)
         FROM contributors c JOIN stories s ON s.id = c.story_id
         WHERE c.user_id = u.id
       ), '[]'::json) AS contributed_stories
     FROM users u WHERE u.id = $1`,
    [userId],
  )
  return result.rows[0] || null
}

async function updateAvatar(userId, avatarUrl) {
  const result = await pool.query(
    'UPDATE users SET avatar_url = $2 WHERE id = $1 RETURNING id::text, username, email, avatar_url',
    [userId, avatarUrl],
  )
  return result.rows[0] || null
}

module.exports = { getByUserId, updateAvatar }
