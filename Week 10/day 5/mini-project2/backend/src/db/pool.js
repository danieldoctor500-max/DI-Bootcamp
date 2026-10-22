const { Pool } = require('pg')
const config = require('../config')

const pool = new Pool({
  connectionString: config.databaseUrl,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
})

pool.on('error', (error) => {
  console.error('Unexpected PostgreSQL pool error:', error.message)
})

module.exports = pool
