const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // Name of the category
    description: { type: String }, // Optional description for the category
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Category', CategorySchema);
