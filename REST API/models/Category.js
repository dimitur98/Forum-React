const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId, Date } = Schema.Types;

const categorySchema = new Schema({

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
    imageUrl: {
        type: String,
        required: true
    },
    posts: [{ type: ObjectId, ref: "Post" }]

});

module.exports = new Model('Category', categorySchema);