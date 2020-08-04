const comment = require('../models/Comment')

module.exports = {
    get:{
        getCommentsByPostId: (req,res,next) => {
            const {postId} = req.params
            comment.find({post: postId}).populate('author').then((comments) => {
                res.send(comments)
            }).catch(next)
        },
    },
    post:{
        createComment: (req,res,next) => {
            const {author, post, content, parentComment} = req.body
            const createdOn = (new Date() + "").slice(0,24)
            comment.create({ author,createdOn, post,content,parentComment})
                .then((c) => res.send(c)).catch(next)
        }
    }
}