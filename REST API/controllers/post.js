const post = require('../models/Post')
const comment = require('../models/Comment')

const deleteCommentById = async(id)=>{
    const comments = await comment.find({parentComment: id.id})
    if(comments){
        comments.forEach(async(sc) => {
            await deleteCommentById({id:sc._id.toString()})
            await comment.findOneAndDelete({_id:sc._id})
        });
    }
    return
}

module.exports = {
    get:{
        postsByCategory: (req,res,next) => {
            const {categoryId} = req.params
            post.find({categoryId: categoryId}).populate('author').then((posts) => {
                res.send(posts)
            }).catch(next)
        },
        getPostById: (req,res,next) => {
            const { postId } = req.params
            post.findOne({_id: postId}).populate('author').then((post) => {
                res.send(post)
            }).catch(next)
            
        },
        getPostsByUserId: (req,res,next) => {
            const {userId} = req.params
            post.find({author: userId}).populate('author').then(p => {
                res.send(p)
            })
        }
    },
    post:{
        createPost: (req, res, next) => {
            const { name, author, categoryId, content} = req.body;
            const createdOn = (new Date() + "").slice(0,24)
            post.create({ name, author,createdOn, categoryId,  content})
                .then((post) => res.send(post))
                .catch(next)
        },
        makeVote: async(req,res,next) => {
            const {vote,postId, userId} = req.body
            const p = await post.findOne({_id: postId})
            var isUpVoted = false
            var isDownVoted = false

            p.upVotes.forEach(v => {
                if(v.toString() === userId){

                        isUpVoted = true
                }
            });
            

                p.downVotes.forEach(v => {
                    if(v.toString() === userId){
                        isDownVoted = true
                    }
                });

                if(vote === '+' && !isUpVoted){
                    p.upVotes.push(userId)
                    await post.findOneAndUpdate({_id: postId}, {upVotes: p.upVotes})
                    const index = p.downVotes.indexOf(userId)
                    p.downVotes.splice(index,1)
                    await post.findOneAndUpdate({_id: postId}, {downVotes: p.downVotes})
                }else if(vote === '-' && !isDownVoted){
                    p.downVotes.push(userId)
                    await post.findOneAndUpdate({_id: postId}, {downVotes: p.downVotes})

                    const index = p.upVotes.indexOf(userId)
                    
                    p.upVotes.splice(index,1)
                    await post.findOneAndUpdate({_id: postId}, {upVotes: p.upVotes})
                    
                }
            const totalVotes = p.upVotes.length - p.downVotes.length
            res.send({votes:totalVotes})

        }

    },
    delete:{
        deletePost: async (req,res,next) => {
            const {postId} = req.params
            await deleteCommentById({id:postId})
            await post.findOneAndDelete({_id:postId})
            res.send("done")
        }
    }
}