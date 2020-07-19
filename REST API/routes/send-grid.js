const controllers = require('../controllers/');
const router = require('express').Router();

router.post('/send', controllers.sendGrid.post.sendMail);

module.exports = router
