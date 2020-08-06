const user = require('./user');
const sendGrid = require('./send-grid');
const category = require('./category')
const post = require('./post')
const comment = require('./comment')
const cloudinary = require('./cloudinary')

module.exports = {
    user,
    sendGrid,
    category,
    post,
    comment,
    cloudinary
};