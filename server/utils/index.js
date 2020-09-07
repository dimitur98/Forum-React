const jwt = require('./jwt');
const auth = require('./auth');
const sendMsg = require('./sendGrid')
const deleteCommentById = require('./deleteCommentById')

module.exports = {
    jwt,
    auth,
    sendMsg,
    deleteCommentById
};