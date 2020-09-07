const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId, Date } = Schema.Types;

const commentSchema = new Schema({



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
    content: {
        type: String,
        required: true
    },
    parentComment:{
        type: ObjectId,
        ref: "Comment"
    }
    
});

module.exports = new Model('Comment', commentSchema);