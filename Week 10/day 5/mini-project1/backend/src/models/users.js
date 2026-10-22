const pool = require('../db/pool')

async function create({ username, email, passwordHash }) {
  const result = await pool.query(
    `INSERT INTO users (username, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, username, email, created_at`,
    [username, email, passwordHash],
  )
  return result.rows[0]
}

async function findByEmail(email) {
  const result = await pool.query(
    'SELECT id, username, email, password_hash, created_at FROM users WHERE email = $1',
    [email],
  )
  return result.rows[0] || null
}

async function findPublicById(id) {
  const result = await pool.query(
    'SELECT id, username, email, created_at FROM users WHERE id = $1',
    [id],
  )
  return result.rows[0] || null
}

async function findByEmailExact(email) {
  const result = await pool.query(
    'SELECT id, username, email FROM users WHERE email = $1',
    [email],
  )
  return result.rows[0] || null
}

module.exports = { create, findByEmail, findByEmailExact, findPublicById }
