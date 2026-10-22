const pool = require('../db/pool')

const STORY_SELECT = `
  SELECT s.id::text, s.title, s.content, s.author_id::text, s.comments_enabled, s.created_at, s.updated_at,
    json_build_object('id', author.id::text, 'username', author.username) AS author,
    COALESCE((
      SELECT json_agg(json_build_object('id', u.id::text, 'contributorId', c.id::text, 'username', u.username)
                      ORDER BY u.username)
      FROM contributors c JOIN users u ON u.id = c.user_id
      WHERE c.story_id = s.id
    ), '[]'::json) AS contributors
  FROM stories s
  JOIN users author ON author.id = s.author_id`

async function listAll() {
  const result = await pool.query(
    `${STORY_SELECT}
     ORDER BY s.updated_at DESC`,
  )
  return result.rows
}

async function findById(id) {
  const result = await pool.query(`${STORY_SELECT} WHERE s.id = $1`, [id])
  return result.rows[0] || null
}

async function create({ title, content, authorId }) {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const result = await client.query(
      'INSERT INTO stories (title, content, author_id) VALUES ($1, $2, $3) RETURNING id',
      [title, content, authorId],
    )
    const storyId = result.rows[0].id
    await client.query(
      'INSERT INTO story_versions (story_id, title, content, user_id) VALUES ($1, $2, $3, $4)',
      [storyId, title, content, authorId],
    )
    await client.query('COMMIT')
    return findById(storyId)
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

async function update({ id, title, content, commentsEnabled, userId, recordVersion = true }) {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const result = await client.query(
      `UPDATE stories
       SET title = $2, content = $3, comments_enabled = $4, updated_at = NOW()
       WHERE id = $1 RETURNING id`,
      [id, title, content, commentsEnabled],
    )
    if (result.rowCount === 0) {
      await client.query('ROLLBACK')
      return null
    }
    if (recordVersion) {
      await client.query(
        'INSERT INTO story_versions (story_id, title, content, user_id) VALUES ($1, $2, $3, $4)',
        [id, title, content, userId],
      )
    }
    await client.query('COMMIT')
    return findById(id)
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

async function restoreVersion({ id, title, content, userId }) {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const result = await client.query(
      `UPDATE stories SET title = $2, content = $3, updated_at = NOW()
       WHERE id = $1 RETURNING id`,
      [id, title, content],
    )
    if (result.rowCount === 0) {
      await client.query('ROLLBACK')
      return null
    }
    await client.query(
      'INSERT INTO story_versions (story_id, title, content, user_id) VALUES ($1, $2, $3, $4)',
      [id, title, content, userId],
    )
    await client.query('COMMIT')
    return findById(id)
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

async function remove(id) {
  const result = await pool.query('DELETE FROM stories WHERE id = $1 RETURNING id', [id])
  return result.rowCount > 0
}

async function canEdit(storyId, userId) {
  const result = await pool.query(
    `SELECT EXISTS (
       SELECT 1 FROM stories WHERE id = $1 AND author_id = $2
       UNION ALL
       SELECT 1 FROM contributors WHERE story_id = $1 AND user_id = $2
     ) AS allowed`,
    [storyId, userId],
  )
  return result.rows[0].allowed
}

async function isAuthor(storyId, userId) {
  const result = await pool.query(
    'SELECT EXISTS (SELECT 1 FROM stories WHERE id = $1 AND author_id = $2) AS allowed',
    [storyId, userId],
  )
  return result.rows[0].allowed
}

async function exists(id) {
  const result = await pool.query('SELECT EXISTS (SELECT 1 FROM stories WHERE id = $1) AS found', [id])
  return result.rows[0].found
}

module.exports = { canEdit, create, exists, findById, isAuthor, listAll, remove, restoreVersion, update }
