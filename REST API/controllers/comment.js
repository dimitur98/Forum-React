const comment = require('../models/Comment')

module.exports = {
    get:{
        getCommentsByPostId: (req,res,next) => {
            const {postId} = req.params
            console.log(postId)
            comment.find({post: postId}).populate('author').then((comments) => {
                console.log(comments)
                res.send(comments)
            }).catch(next)
        },
    },
    post:{
        createComment: (req,res,next) => {
            const {name, author, post, content, parentComment} = req.body
            const createdOn = (new Date() + "").slice(0,24)
            comment.create({ name, author,createdOn, post,content,parentComment})
                .then((c) => res.send(c)).catch(next)
        }
    }
}