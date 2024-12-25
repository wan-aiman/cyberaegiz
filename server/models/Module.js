const mongoose = require('mongoose');

const subtopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  details: { type: String, required: true },
});

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  estimatedTime: { type: Number, required: true },
  content: { type: [subtopicSchema], required: true }, // Embedded array of subtopics
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
});

module.exports = mongoose.model('Module', moduleSchema);