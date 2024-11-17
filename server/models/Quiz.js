const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title of the quiz
    category: { type: String, required: true }, // Category of the quiz (e.g., Cybersecurity Basics)
    description: { type: String, required: false }, // Brief description of the quiz
    questions: [
        {
            question: { type: String, required: true }, // The question text
            answers: [String], // List of possible answers
            correctAnswer: { type: String, required: true } // Correct answer from the list
        }
    ],
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' }, // Difficulty level
    estimatedTime: { type: Number, default: 5 }, // Estimated time to complete (in minutes)
    createdAt: { type: Date, default: Date.now }, // When the quiz was created
});

module.exports = mongoose.model('Quiz', QuizSchema);
