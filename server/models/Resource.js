const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title of the resource
    description: { type: String }, // Brief description
    url: { type: String, required: true }, // Link to the resource
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Associated category
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Resource', ResourceSchema);
