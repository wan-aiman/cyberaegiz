const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: String, required: true },
});

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true }, // Link to the module
    questions: { type: [questionSchema], required: true },
});

module.exports = mongoose.model('Quiz', quizSchema);
