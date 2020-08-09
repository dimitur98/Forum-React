const category = require('../models/Category')
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
        getAllCategoriesNotDeleted: (req,res,next) => {
            category.find().then((categories) => {
                res.send(categories)
            }).catch(next)
        },
        getCategoryById: (req,res,next) => {
            const {categoryId} = req.params
            category.findById(categoryId).then(c => {
                res.send(c)
            }).catch(next)
        }
    },
    post:{
        createCategory: (req, res, next) => {
            const { name, author, imageUrl} = req.body;
            const createdOn = (new Date() + "").slice(0,24)
            category.create({ name, author,createdOn, imageUrl })
                .then((category) => res.send(category))
                .catch(next)
        },

    },
    delete:{
        deleteCategory: async(req,res,next) => {
            const {id} = req.params
            const posts = await post.find({categoryId: id})
            posts.forEach( async(p) => {
                await deleteCommentById({id:p._id})
                await post.findOneAndDelete({_id:p._id})
            })
            await category.findOneAndDelete({_id:id})
            res.send("done")
        }
    }
}