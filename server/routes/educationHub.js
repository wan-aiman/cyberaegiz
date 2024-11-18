const express = require('express');
const Category = require('../models/Category');
const Module = require('../models/Module');
const Resource = require('../models/Resource');
const Quiz = require('../models/Quiz');
const Badge = require('../models/Badge');

const router = express.Router();

// Fetch all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ message: 'Error fetching categories' });
  }
});

// Fetch all modules
// Get all modules or filter by category
router.get('/modules', async (req, res) => {
    try {
        const { category } = req.query; // Get category from query params
        let modules;

        if (category) {
            // Filter modules by category if provided
            modules = await Module.find({ category });
        } else {
            // Fetch all modules if no category is specified
            modules = await Module.find();
        }

        res.json(modules);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching modules' });
    }
});

// Get module by ID
router.get('/modules/:id', async (req, res) => {
    try {
      const module = await Module.findById(req.params.id);
      if (!module) {
        return res.status(404).json({ message: 'Module not found' });
      }
      res.json(module);
    } catch (error) {
      console.error('Error fetching module:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });  

// Fetch all resources
router.get('/resources', async (req, res) => {
  try {
    const resources = await Resource.find({});
    res.status(200).json(resources);
  } catch (err) {
    console.error('Error fetching resources:', err);
    res.status(500).json({ message: 'Error fetching resources' });
  }
});

// Fetch all quizzes
router.get('/quizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.find({});
    res.status(200).json(quizzes);
  } catch (err) {
    console.error('Error fetching quizzes:', err);
    res.status(500).json({ message: 'Error fetching quizzes' });
  }
});

// Fetch all badges
router.get('/badges', async (req, res) => {
  try {
    const badges = await Badge.find({});
    res.status(200).json(badges);
  } catch (err) {
    console.error('Error fetching badges:', err);
    res.status(500).json({ message: 'Error fetching badges' });
  }
});

module.exports = router;
