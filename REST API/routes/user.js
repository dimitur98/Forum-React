const controllers = require('../controllers/');
const router = require('express').Router();

router.get('/', controllers.user.get.getUser);
router.get('/verify', controllers.user.get.verifyLogin);
router.get('/confirm/:uuid/:userId', controllers.user.get.confirmEmail);

router.post('/register', controllers.user.post.register);
router.post('/login', controllers.user.post.login);
router.post('/logout', controllers.user.post.logout);

router.put('/:id', controllers.user.put);

router.delete('/:id', controllers.user.delete);

module.exports = router;