// models/Article.js
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    summary: { type: String, required: true },
    date: { type: Date, default: Date.now },
    tags: [{ type: String }]
});

module.exports = mongoose.model('Article', articleSchema);
