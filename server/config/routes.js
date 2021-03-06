const router = require('../routes/');

module.exports = (app) => {

    app.use('/api/user', router.user);

    app.use('/api/category', router.category)
    app.use('/api/sendGrid', router.sendGrid)
    app.use('/api/post', router.post)
    app.use('/api/comment', router.comment)
    app.use('/api/cloudinary', router.cloudinary)

    app.use('*', (req, res, next) => res.send('<h1> Something went wrong. Try again. :thumbsup: </h1>'))
};