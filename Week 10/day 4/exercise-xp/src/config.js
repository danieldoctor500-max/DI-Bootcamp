const accessSecret = process.env.JWT_ACCESS_SECRET
const refreshSecret = process.env.JWT_REFRESH_SECRET

if (!accessSecret || accessSecret.length < 32) {
  throw new Error('JWT_ACCESS_SECRET must be set to at least 32 characters.')
}

if (!refreshSecret || refreshSecret.length < 32) {
  throw new Error('JWT_REFRESH_SECRET must be set to at least 32 characters.')
}

if (accessSecret === refreshSecret) {
  throw new Error('Access and refresh JWT secrets must be different.')
}

module.exports = {
  port: Number.parseInt(process.env.PORT ?? '3000', 10),
  isProduction: process.env.NODE_ENV === 'production',
  accessSecret,
  refreshSecret,
  issuer: 'jwt-auth-exercise',
  audience: 'jwt-auth-client',
}