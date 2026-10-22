const express = require('express')
const authenticate = require('../middleware/authenticate')
const controller = require('../controllers/versionsController')

const router = express.Router()

router.use(authenticate)
router.get('/:storyId', controller.list)
router.post('/:storyId/restore', controller.restore)

module.exports = router
