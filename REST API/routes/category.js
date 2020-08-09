const controllers = require('../controllers/')
const router = require('express').Router()

router.get('/allCategories', controllers.category.get.getAllCategoriesNotDeleted)
router.get('/getCategoryById/:categoryId', controllers.category.get.getCategoryById)

router.post('/createCategory', controllers.category.post.createCategory)

router.delete('/deleteCategory/:id', controllers.category.delete.deleteCategory)

module.exports = router;