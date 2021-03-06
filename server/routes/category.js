const controllers = require('../controllers/')
const router = require('express').Router()
const { auth } = require('../utils');

router.get('/allCategories', controllers.category.get.getAllCategoriesNotDeleted)
router.get('/getCategoryById/:categoryId', controllers.category.get.getCategoryById)

router.post('/createCategory',auth(), controllers.category.post.createCategory)

router.delete('/deleteCategory/:id',auth(), controllers.category.delete.deleteCategory)

module.exports = router;