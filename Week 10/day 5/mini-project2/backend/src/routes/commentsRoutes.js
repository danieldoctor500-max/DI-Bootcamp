const express = require('express')
const authenticate = require('../middleware/authenticate')
const controller = require('../controllers/commentsController')

const router = express.Router()

router.use(authenticate)
router.post('/', controller.create)
router.get('/:story_id', controller.list)
router.patch('/:id', controller.update)
router.delete('/:id', controller.remove)
router.post('/:id/reactions', controller.toggleReaction)

module.exports = router
