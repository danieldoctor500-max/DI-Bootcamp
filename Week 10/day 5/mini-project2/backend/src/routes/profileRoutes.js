const express = require('express')
const multer = require('multer')
const authenticate = require('../middleware/authenticate')
const controller = require('../controllers/profileController')
const { AppError } = require('../helpers/errors')

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter(req, file, callback) {
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(file.mimetype)) {
      return callback(new AppError(400, 'Avatar must be a JPEG, PNG, WebP, or AVIF image.'))
    }
    return callback(null, true)
  },
})

const router = express.Router()

router.use(authenticate)
router.get('/me', controller.getMine)
router.post('/me/avatar', upload.single('avatar'), controller.uploadAvatar)

module.exports = router
