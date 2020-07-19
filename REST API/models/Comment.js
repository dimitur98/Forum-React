const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId, Date } = Schema.Types;

const commentSchema = new Schema({

    name: {
        type: String,
        required: true,
    },

    author: {
        type: ObjectId,
        ref: "User"
    },
    createdOn: {
        type: Date,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    post: {
        type: ObjectId,
        ref: "Post"
    },
    
});

module.exports = new Model('Comment', commentSchema);