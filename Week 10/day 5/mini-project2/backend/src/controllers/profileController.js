const cloudinary = require('cloudinary').v2
const { AppError } = require('../helpers/errors')
const profiles = require('../models/profiles')

const cloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET,
)

if (cloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  })
}

async function getMine(req, res) {
  const profile = await profiles.getByUserId(req.user.id)
  if (!profile) throw new AppError(404, 'Profile not found.')
  return res.json({ profile })
}

async function uploadAvatar(req, res) {
  if (!cloudinaryConfigured) {
    throw new AppError(503, 'Avatar uploads are not configured on this server.')
  }
  if (!req.file) throw new AppError(400, 'Choose an image to upload.')

  const avatarUrl = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'storyweave/avatars', resource_type: 'image', transformation: [{ width: 512, height: 512, crop: 'fill' }] },
      (error, result) => {
        if (error) return reject(error)
        if (!result?.secure_url) return reject(new Error('Cloudinary did not return an image URL.'))
        return resolve(result.secure_url)
      },
    )
    stream.end(req.file.buffer)
  })
  const user = await profiles.updateAvatar(req.user.id, avatarUrl)
  return res.json({ user })
}

module.exports = { getMine, uploadAvatar }
