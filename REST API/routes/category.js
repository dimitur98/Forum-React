const controllers = require('../controllers/')
const router = require('express').Router()

router.get('/allCategories', controllers.category.get.getAllCategoriesNotDeleted)
router.get('/getCategoryById/:categoryId', controllers.category.get.getCategoryById)

router.post('/createCategory', controllers.category.post.createCategory)

module.exports = router;