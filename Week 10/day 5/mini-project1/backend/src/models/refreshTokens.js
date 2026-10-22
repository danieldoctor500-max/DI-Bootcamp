const pool = require('../db/pool')

async function create({ id, userId, tokenHash, expiresAt }) {
  await pool.query(
    'INSERT INTO refresh_tokens (id, user_id, token_hash, expires_at) VALUES ($1, $2, $3, $4)',
    [id, userId, tokenHash, expiresAt],
  )
}

async function findByHash(tokenHash) {
  const result = await pool.query(
    'SELECT id, user_id, expires_at, revoked_at FROM refresh_tokens WHERE token_hash = $1',
    [tokenHash],
  )
  return result.rows[0] || null
}

async function rotate({ currentId, id, userId, tokenHash, expiresAt }) {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const revoked = await client.query(
      `UPDATE refresh_tokens SET revoked_at = NOW()
       WHERE id = $1 AND user_id = $2 AND revoked_at IS NULL AND expires_at > NOW()
       RETURNING id`,
      [currentId, userId],
    )
    if (revoked.rowCount !== 1) {
      await client.query('ROLLBACK')
      return false
    }
    await client.query(
      `INSERT INTO refresh_tokens (id, user_id, token_hash, expires_at)
       VALUES ($1, $2, $3, $4)`,
      [id, userId, tokenHash, expiresAt],
    )
    await client.query('COMMIT')
    return true
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

async function revokeAllForUser(userId) {
  await pool.query(
    'UPDATE refresh_tokens SET revoked_at = NOW() WHERE user_id = $1 AND revoked_at IS NULL',
    [userId],
  )
}

async function revokeByHash(tokenHash) {
  await pool.query(
    'UPDATE refresh_tokens SET revoked_at = NOW() WHERE token_hash = $1 AND revoked_at IS NULL',
    [tokenHash],
  )
}

module.exports = { create, findByHash, revokeAllForUser, revokeByHash, rotate }
