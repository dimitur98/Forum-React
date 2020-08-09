const controllers = require('../controllers/')
const router = require('express').Router()
const { auth } = require('../utils');

router.get('/getComments/:postId', controllers.comment.get.getCommentsByPostId)

router.post('/createComment',auth(), controllers.comment.post.createComment)

router.delete('/deleteComment/:commentId',auth(), controllers.comment.delete.deleteComment)

module.exports = router;