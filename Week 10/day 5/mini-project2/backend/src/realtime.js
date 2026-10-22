const jwt = require('jsonwebtoken')
const { Server } = require('socket.io')
const config = require('./config')
const stories = require('./models/stories')

function parseStoryId(value) {
  if (typeof value !== 'string' || !/^[1-9]\d*$/.test(value)) return null
  const id = Number(value)
  return Number.isSafeInteger(id) ? id : null
}

function attachRealtime(server, app) {
  const io = new Server(server, {
    cors: { origin: config.clientOrigin, credentials: true },
    maxHttpBufferSize: 100_000,
  })
  app.set('io', io)

  io.use((socket, next) => {
    const token = socket.handshake.auth?.accessToken
    if (typeof token !== 'string') return next(new Error('Authentication required.'))
    try {
      const payload = jwt.verify(token, config.jwtSecret, {
        issuer: 'storyweave-api',
        audience: 'storyweave-client',
        algorithms: ['HS256'],
      })
      if (typeof payload === 'string' || typeof payload.sub !== 'string' || typeof payload.exp !== 'number') {
        return next(new Error('Invalid access token.'))
      }
      socket.data.expiresAt = payload.exp * 1000
      socket.data.user = { id: payload.sub, username: payload.username }
      return next()
    } catch {
      return next(new Error('Access token is invalid or expired.'))
    }
  })

  io.on('connection', (socket) => {
    socket.on('story:join', async (input, acknowledge = () => {}) => {
      try {
        const storyId = parseStoryId(input?.storyId)
        if (!storyId || !(await stories.exists(storyId))) {
          return acknowledge({ error: 'Story not found.' })
        }
        await socket.join(`story:${storyId}`)
        return acknowledge({ ok: true })
      } catch {
        return acknowledge({ error: 'Unable to join this story.' })
      }
    })

    socket.on('story:leave', (input) => {
      const storyId = parseStoryId(input?.storyId)
      if (storyId) void socket.leave(`story:${storyId}`)
    })

    socket.on('story:edit', async (input, acknowledge = () => {}) => {
      try {
        if (Date.now() >= socket.data.expiresAt) {
          socket.disconnect(true)
          return acknowledge({ error: 'Access token expired. Reconnect to continue.' })
        }
        const storyId = parseStoryId(input?.storyId)
        if (!storyId || !socket.rooms.has(`story:${storyId}`)) {
          return acknowledge({ error: 'Join the story before editing.' })
        }
        if (!(await stories.canEdit(storyId, socket.data.user.id))) {
          return acknowledge({ error: 'Only the author and contributors can edit this story.' })
        }
        const current = await stories.findById(storyId)
        const title = typeof input.title === 'string' ? input.title.trim() : ''
        const content = typeof input.content === 'string' ? input.content.trim() : ''
        if (!current || !title || title.length > 255 || !content || content.length > 50000) {
          return acknowledge({ error: 'Provide a valid title and story content.' })
        }
        const story = await stories.update({
          id: storyId,
          title,
          content,
          commentsEnabled: current.comments_enabled,
          userId: socket.data.user.id,
          recordVersion: false,
        })
        socket.to(`story:${storyId}`).emit('story:updated', { story, editor: socket.data.user })
        return acknowledge({ ok: true, story })
      } catch {
        return acknowledge({ error: 'Unable to save the story right now.' })
      }
    })

    socket.on('story:cursor', (input) => {
      if (Date.now() >= socket.data.expiresAt) {
        socket.disconnect(true)
        return
      }
      const storyId = parseStoryId(input?.storyId)
      if (!storyId || !socket.rooms.has(`story:${storyId}`)) return
      if (!Number.isSafeInteger(input?.position) || input.position < 0 || input.position > 50000) return
      socket.to(`story:${storyId}`).emit('story:cursor', {
        storyId: String(storyId),
        userId: socket.data.user.id,
        username: socket.data.user.username,
        position: input.position,
      })
    })
  })

  return io
}

module.exports = { attachRealtime }
