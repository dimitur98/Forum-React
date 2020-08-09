const controllers = require('../controllers/')
const router = require('express').Router()
const { auth } = require('../utils');

router.get('/postsByCategory/:categoryId', controllers.post.get.postsByCategory)
router.get('/getPostsByUserId/:userId', controllers.post.get.getPostsByUserId);
router.get('/getPostById/:postId', controllers.post.get.getPostById)

router.post('/createPost',auth(), controllers.post.post.createPost)
router.post('/vote',auth(), controllers.post.post.makeVote)
router.delete('/deletePost/:postId',auth(), controllers.post.delete.deletePost)

module.exports = router;