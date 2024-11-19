const express = require('express');
const { getArticles } = require('../controllers/articleController');
const router = express.Router();

router.get('/', getArticles); // Handles GET requests to /api/articles

module.exports = router;