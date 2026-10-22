const express = require('express')
const authenticate = require('../middleware/authenticate')
const storyController = require('../controllers/storyController')

const router = express.Router()

router.use(authenticate)
router.get('/', storyController.list)
router.post('/', storyController.create)
router.patch('/:id', storyController.update)
router.delete('/:id', storyController.remove)

module.exports = router
