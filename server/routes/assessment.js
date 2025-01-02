// server/routes/assessment.js
const express = require('express');
const router = express.Router();
const Module = require('../models/Module');
const Category = require('../models/Category');

// Sample questions for the assessment with category IDs
const questions = [
    // Basic Questions
    {
      question: '1. What is the primary goal of a firewall in a network?',
      options: [
        'To block all internet access',
        'To filter and monitor incoming and outgoing traffic',
        'To speed up network connections'
      ],
      correctAnswer: 1,
      category: 'Cybersecurity Essentials', // Will be replaced with category ID dynamically
    },
    {
      question: '2. Which of the following is a key principle of multi-factor authentication (MFA)?',
      options: [
        'Using multiple passwords for one account',
        'Requiring two or more verification factors, such as a password and a fingerprint',
        'Granting access based on device model'
      ],
      correctAnswer: 1,
      category: 'Authentication Control', // Will be replaced with category ID dynamically
    },
    {
      question: '3. What is the most effective way to prevent unauthorized access to your Wi-Fi network?',
      options: [
        'Setting up a guest network',
        'Using a strong password and WPA3 encryption',
        'Turning off the router when not in use'
      ],
      correctAnswer: 1,
      category: 'Online Safety and Privacy', // Will be replaced with category ID dynamically
    },
    {
      question: '4. Which of the following is a common characteristic of phishing emails?',
      options: [
        'Professional grammar and formatting',
        'Urgent requests for sensitive information',
        'Sent only to IT professionals'
      ],
      correctAnswer: 1,
      category: 'Threat Recognition & Response', // Will be replaced with category ID dynamically
    },
    {
      question: '5. What is one of the most reliable methods to ensure data privacy?',
      options: [
        'Encrypting sensitive data during storage and transmission',
        'Deleting unused files regularly',
        'Sharing data only with close colleagues'
      ],
      correctAnswer: 0,
      category: 'Data Protection', // Will be replaced with category ID dynamically
    },
  
    // Scenario-Based Questions
    {
      question: '6. An employee receives an email claiming to be from their manager, requesting immediate transfer of funds to a new vendor. The email contains a vague subject and an unverified link. What should the employee do?',
      options: [
        'Transfer the funds immediately to avoid delays',
        'Verify the request by calling the manager directly using known contact details',
        'Click the link to confirm the request’s details'
      ],
      correctAnswer: 1,
      category: 'Cybersecurity Essentials', // Will be replaced with category ID dynamically
    },
    {
      question: '7. You notice a large amount of unknown traffic from an IP address on your company’s network. What is the first step to take?',
      options: [
        'Ignore it, as it might be normal traffic',
        'Isolate the device from the network and notify the IT team',
        'Block all traffic from the internet'
      ],
      correctAnswer: 1,
      category: 'Threat Recognition & Response', // Will be replaced with category ID dynamically
    },
    {
      question: '8. A colleague has forgotten their multi-factor authentication device and cannot log in to their account. What is the best course of action?',
      options: [
        'Disable MFA for them temporarily',
        'Use backup recovery codes provided during MFA setup',
        'Share your own MFA device temporarily'
      ],
      correctAnswer: 1,
      category: 'Authentication Control', // Will be replaced with category ID dynamically
    },
    {
      question: '9. You are tasked with sharing sensitive client data with an external partner. Which action ensures compliance with data protection policies?',
      options: [
        'Email the data in an unencrypted attachment for quick access',
        'Use secure file-sharing platforms and encrypt the data',
        'Transfer the data using a public cloud storage link'
      ],
      correctAnswer: 1,
      category: 'Data Protection', // Will be replaced with category ID dynamically
    },
    {
      question: '10. An employee uses the same password for their work email and personal accounts. Why is this a risk, and what should be done?',
      options: [
        'It is not a risk, as the password is personal',
        'It creates a vulnerability if one account is compromised; encourage using a password manager',
        'It simplifies access for IT; leave it as it is'
      ],
      correctAnswer: 1,
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
                score += 10; // Correct answer
            } else {
                weakCategories[question.category] = (weakCategories[question.category] || 0) + 10;
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
