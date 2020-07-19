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
    votes: {
        type: Number,
        default: 0
    },
    content: {
        type: String,
        required: true
    },
    comments: [{ type: ObjectId, ref: "Comment" }]

});

module.exports = new Model('Post', postSchema);