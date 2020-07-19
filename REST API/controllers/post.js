const post = require('../models/Post')

module.exports = {
    get:{
        postsByCategory: (req,res,next) => {
            const {categoryId} = req.params
            post.find({categoryId: categoryId}).populate('author').populate('comments').then((posts) => {
                res.send(posts)
            }).catch(next)
        },
        getPostById: (req,res,next) => {
            const { postId } = req.params
            post.findOne({_id: postId}).populate('author').populate('comments').then((post) => {
                res.send(post)
            }).catch(next)
            
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

    }
}