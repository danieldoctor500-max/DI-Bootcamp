const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const authRoutes = require('./routes/authRoutes')
const profileRoutes = require('./routes/profileRoutes')
const { loginLimiter, refreshLimiter } = require('./middleware/rateLimits')
const { errorHandler, notFound } = require('./middleware/errorHandler')

const app = express()

app.disable('x-powered-by')
app.use(helmet())
app.use(bodyParser.json({ limit: '10kb' }))
app.use(cookieParser())

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }))
app.use('/api/auth/register', loginLimiter)
app.use('/api/auth/login', loginLimiter)
app.use('/api/auth/refresh', refreshLimiter)
app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.use(notFound)
app.use(errorHandler)

module.exports = app