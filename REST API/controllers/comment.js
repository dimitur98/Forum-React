const comment = require('../models/Comment')

const deleteCommentById = async(id)=>{
    const subComments = await comment.find({parentComment: id.id})
    if(subComments){
        subComments.forEach(async(sc) => {
            await deleteCommentById({id:sc._id.toString()})
            await comment.findOneAndDelete({_id:sc._id})
        });
    }
    return
}

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
    },
    delete:{
        deleteComment:async(req,res,next) => {
            const {commentId} = req.params
            await deleteCommentById({id:commentId})
            await comment.findOneAndDelete({_id:commentId})
            res.send("done")
        }
    }
}