const category = require('../models/Category')

module.exports = {
    get:{
        getAllCategoriesNotDeleted: (req,res,next) => {
            category.find().then((categories) => {
                res.send(categories)
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

    }
}