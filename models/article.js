const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: String,
    description: String,
    topic: String,
    headerImage: String,
    content: [{type: Object}],
    date: String,
    views: Number,
    minsToRead: String,
    tags: [{type: String}],
    authorName: String,
    authorTitle: String,
    authorLinks: [{
        type: Object,
    }],
    authorProfilePic: String,
})

module.exports = mongoose.model('Article', articleSchema, 'articles');