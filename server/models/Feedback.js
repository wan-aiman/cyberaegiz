const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    targetId: { type: mongoose.Schema.Types.ObjectId }, // Could be a moduleId, quizId, or general feedback
    type: { type: String, enum: ['module', 'quiz', 'platform'], required: true }, // What the feedback is about
    message: { type: String, required: true }, // User's feedback message
    rating: { type: Number, min: 1, max: 5 }, // Optional rating (1-5 stars)
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
