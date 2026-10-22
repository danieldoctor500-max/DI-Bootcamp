require('dotenv').config()

function requiredSecret(name) {
  const value = process.env[name]
  if (!value || value.length < 32) {
    throw new Error(`${name} must be set to at least 32 characters.`)
  }
  return value
}

const jwtSecret = requiredSecret('JWT_SECRET')
const refreshSecret = requiredSecret('REFRESH_SECRET')
if (jwtSecret === refreshSecret) {
  throw new Error('JWT_SECRET and REFRESH_SECRET must be different.')
}

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL must be set.')
}

module.exports = {
  port: Number.parseInt(process.env.PORT || '3000', 10),
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret,
  refreshSecret,
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  isProduction: process.env.NODE_ENV === 'production',
}
