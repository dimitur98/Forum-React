const controllers = require('../controllers/')
const router = require('express').Router()

router.get('/getComments/:postId', controllers.comment.get.getCommentsByPostId)

router.post('/createComment', controllers.comment.post.createComment)

router.delete('/deleteComment/:commentId', controllers.comment.delete.deleteComment)

module.exports = router;