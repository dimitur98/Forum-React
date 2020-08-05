const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId, Date } = Schema.Types;

const postSchema = new Schema({

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
    categoryId: {
        type: String,
        required: true       
    },
    upVotes: [{
        type: ObjectId,
        ref: 'User'
    }],
    downVotes: [{
        type: ObjectId,
        ref: 'User'
    }],
    content: {
        type: String,
        required: true
    },

});

module.exports = new Model('Post', postSchema);