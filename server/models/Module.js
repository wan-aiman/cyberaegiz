const mongoose = require('mongoose');

const subtopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  details: { type: String, required: true },
  keyPoints: { type: [String], required: true }, // New field for bullet points
});

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  estimatedTime: { type: Number, required: true },
  content: { type: [subtopicSchema], required: true }, // Enhanced subtopics
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  image: { type: String, required: true }, // Field for image URL
});

module.exports = mongoose.model('Module', moduleSchema);