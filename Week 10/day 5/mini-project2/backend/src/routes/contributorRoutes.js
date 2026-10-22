const express = require('express')
const authenticate = require('../middleware/authenticate')
const contributorController = require('../controllers/contributorController')

const router = express.Router()

router.use(authenticate)
router.post('/', contributorController.add)
router.get('/:story_id', contributorController.list)
router.delete('/:id', contributorController.remove)

module.exports = router
