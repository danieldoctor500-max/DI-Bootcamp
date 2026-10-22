const express = require('express')
const authenticate = require('../middleware/authenticate')
const controller = require('../controllers/shareController')

const router = express.Router()

router.post('/stories/:storyId/share', authenticate, controller.create)
router.get('/share/:token', controller.read)

module.exports = router
