const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    estimatedTime: { type: String, required: true }, // Changed to String
    content: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
});

module.exports = mongoose.model('Module', moduleSchema);
