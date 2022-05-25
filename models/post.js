const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    news: {
        type: String,
        required: true
    },
    posterId: {
        type: String,
        required: true
    },
    comment: {
        type: Array,
        required: false
    },
    active: {
        type: Boolean,
        required: false
    },
    trending: {
        type: Boolean,
        required: false
    },
    featured: {
        type: Boolean,
        required: false
    },
})

module.exports = mongoose.model('posts', PostSchema);