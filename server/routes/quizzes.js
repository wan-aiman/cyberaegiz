const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

router.get('/:id', async (req, res) => {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    res.json(quiz);
});

module.exports = router;
