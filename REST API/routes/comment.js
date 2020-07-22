const controllers = require('../controllers/')
const router = require('express').Router()

router.get('/getComments/:postId', controllers.comment.get.getCommentsByPostId)

router.post('/createComment', controllers.comment.post.createComment)

module.exports = router;