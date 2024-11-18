// server/routes/assessment.js
const express = require('express');
const router = express.Router();
const Module = require('../models/Module');
const Category = require('../models/Category');

// Sample questions for the assessment with category IDs
const questions = [
    {
        question: 'What is phishing?',
        options: ['A sport', 'A malicious attempt to steal information', 'A type of software'],
        correctAnswer: 1,
        category: 'Cybersecurity Essentials', // Will be replaced with category ID dynamically
    },
    {
        question: 'What does MFA stand for?',
        options: ['Malware File Analysis', 'Multi-Factor Authentication', 'Main Firewall Access'],
        correctAnswer: 1,
        category: 'Authentication Control', // Will be replaced with category ID dynamically
    },
    {
        question: 'Which of the following is the safest password?',
        options: ['password123', 'yourname123', '@5Rt@9_FgL'],
        correctAnswer: 2,
        category: 'Online Safety and Privacy', // Will be replaced with category ID dynamically
    },
];

// Middleware to dynamically replace category names with IDs
router.use(async (req, res, next) => {
    try {
        const categories = await Category.find();
        const categoryMap = categories.reduce((map, category) => {
            map[category.name] = category._id.toString();
            return map;
        }, {});
        questions.forEach((question) => {
            if (categoryMap[question.category]) {
                question.category = categoryMap[question.category];
            }
        });
        next();
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Error setting up questions' });
    }
});

// Get assessment questions
router.get('/questions', (req, res) => {
    res.json(questions);
});

// Submit assessment answers
router.post('/submit', async (req, res) => {
    try {
        const { answers } = req.body; // Receive user answers
        let score = 0;
        const weakCategories = {};

        // Calculate scores and weak categories
        questions.forEach((question, index) => {
            const userAnswer = answers[index];
            if (userAnswer === question.correctAnswer) {
                score += 1; // Correct answer
            } else {
                weakCategories[question.category] = (weakCategories[question.category] || 0) + 1;
            }
        });

        // Suggest modules based on weak categories
        const suggestedModules = await Module.find({
            category: { $in: Object.keys(weakCategories) },
        });

        res.json({
            score,
            suggestions: suggestedModules,
        });
    } catch (error) {
        console.error('Error processing assessment:', error);
        res.status(500).json({ error: 'Error processing assessment' });
    }
});

module.exports = router;
