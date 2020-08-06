const controllers = require('../controllers/')
const router = require('express').Router()

router.post('/deleteAvatar/:userId', controllers.cloudinary.post.deleteImage);

module.exports = router;
