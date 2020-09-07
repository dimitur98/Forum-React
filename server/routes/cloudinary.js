const controllers = require('../controllers/')
const router = require('express').Router()
const { auth } = require('../utils');

router.post('/deleteAvatar/:userId',auth(), controllers.cloudinary.post.deleteImage);

module.exports = router;
