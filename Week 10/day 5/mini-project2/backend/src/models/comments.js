const pool = require('../db/pool')

async function listForStory(storyId, userId) {
  const result = await pool.query(
    `SELECT c.id::text, c.story_id::text, c.comment_text, c."timestamp" AS timestamp,
       json_build_object('id', u.id::text, 'username', u.username) AS author,
       COALESCE((
         SELECT json_agg(json_build_object('reaction', r.reaction, 'count', r.count, 'reacted', r.reacted))
         FROM (
           SELECT reaction,
             COUNT(*)::int AS count,
             BOOL_OR(user_id = $2) AS reacted
           FROM comment_reactions
           WHERE comment_id = c.id
           GROUP BY reaction
         ) r
       ), '[]'::json) AS reactions
     FROM comments c JOIN users u ON u.id = c.user_id
     WHERE c.story_id = $1 ORDER BY c."timestamp"`,
    [storyId, userId],
  )
  return result.rows
}

async function create({ storyId, userId, content }) {
  const result = await pool.query(
    `INSERT INTO comments (story_id, user_id, comment_text)
     VALUES ($1, $2, $3)
     RETURNING id::text, story_id::text, comment_text, "timestamp" AS timestamp`,
    [storyId, userId, content],
  )
  return result.rows[0]
}

async function findById(id) {
  const result = await pool.query(
    `SELECT c.id::text, c.story_id::text, c.user_id::text, c.comment_text,
       s.author_id::text AS story_author_id, s.comments_enabled
     FROM comments c JOIN stories s ON s.id = c.story_id
     WHERE c.id = $1`,
    [id],
  )
  return result.rows[0] || null
}

async function update({ id, content }) {
  const result = await pool.query(
    `UPDATE comments SET comment_text = $2 WHERE id = $1
     RETURNING id::text, story_id::text, comment_text, "timestamp" AS timestamp`,
    [id, content],
  )
  return result.rows[0] || null
}

async function remove(id) {
  const result = await pool.query('DELETE FROM comments WHERE id = $1 RETURNING id', [id])
  return result.rowCount > 0
}

async function toggleReaction({ commentId, userId, reaction }) {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    await client.query(
      'SELECT pg_advisory_xact_lock(hashtext($1), hashtext($2))',
      [`${commentId}`, `${userId}:${reaction}`],
    )
    const existing = await client.query(
      `DELETE FROM comment_reactions
       WHERE comment_id = $1 AND user_id = $2 AND reaction = $3
       RETURNING id`,
      [commentId, userId, reaction],
    )
    const active = existing.rowCount === 0
    if (active) {
      await client.query(
        `INSERT INTO comment_reactions (comment_id, user_id, reaction)
         VALUES ($1, $2, $3)`,
        [commentId, userId, reaction],
      )
    }
    await client.query('COMMIT')
    return active
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

module.exports = { create, findById, listForStory, remove, toggleReaction, update }
