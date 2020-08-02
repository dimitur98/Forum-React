const jwt = require('./jwt');
const auth = require('./auth');
const sendMsg = require('./sendGrid')

module.exports = {
    jwt,
    auth,
    sendMsg
};