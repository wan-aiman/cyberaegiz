const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

router.get('/', async (req, res) => {
    const quizzes = await Quiz.find();
    res.json(quizzes);
});

router.post('/create', async (req, res) => {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json(quiz);
});

module.exports = router;
