// routes/quizRoutes.js
const express = require('express');
const {
    getQuizzes,
    getQuizById,
    createQuiz,
    updateQuiz,
    deleteQuiz
} = require('../controllers/quizController');

const router = express.Router();

router.get('/', getQuizzes);              // GET all quizzes
router.get('/:id', getQuizById);          // GET quiz by ID
router.post('/', createQuiz);             // POST new quiz
router.put('/:id', updateQuiz);           // PUT update quiz by ID
router.delete('/:id', deleteQuiz);        // DELETE quiz by ID

module.exports = router;
