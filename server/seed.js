const mongoose = require('mongoose');
const Category = require('./models/Category');
const Resource = require('./models/Resource');
const Quiz = require('./models/Quiz');
const Module = require('./models/Module');
const Badge = require('./models/Badge');

// MongoDB connection
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Seed function
const seedData = async () => {
    try {
        // Clean up previous data
        await Category.deleteMany({});
        await Resource.deleteMany({});
        await Quiz.deleteMany({});
        await Module.deleteMany({});
        await Badge.deleteMany({});

        console.log('Previous data deleted.');

        // Seed categories
        const categories = [
            { name: 'Cybersecurity Essentials', description: 'Learn the basics of cybersecurity.' },
            { name: 'Online Safety and Privacy', description: 'How to stay safe and private online.' },
            { name: 'Authentication Control', description: 'Secure authentication practices.' },
        ];

        const createdCategories = await Category.insertMany(categories);
        console.log('Categories seeded.');

        // Map category names to ObjectIds
        const categoryMap = {};
        createdCategories.forEach((category) => {
            categoryMap[category.name] = category._id; // Map category name to its ObjectId
        });

        // Seed quizzes
        const quizzes = [
            {
                title: 'Basic Cybersecurity Quiz',
                category: categoryMap['Cybersecurity Essentials'], // Reference the correct category
                questions: [
                    {
                        question: 'What is phishing?',
                        options: ['A type of sport', 'An online scam', 'A password'],
                        correctAnswer: 'An online scam',
                    },
                    {
                        question: 'What does MFA stand for?',
                        options: ['Multi-Factor Authentication', 'Malware File Analysis', 'Main Firewall Access'],
                        correctAnswer: 'Multi-Factor Authentication',
                    },
                ],
            },
        ];

        await Quiz.insertMany(quizzes);
        console.log('Quizzes seeded.');

        // Seed modules
        const modules = [
          {
              title: 'Cybersecurity Basics',
              description: 'An introduction to the key concepts in cybersecurity.',
              estimatedTime: 30,
              content: 'This module covers phishing, malware, and more.',
              category: categoryMap['Cybersecurity Essentials'],
          },
          {
              title: 'Understanding MFA',
              description: 'Learn about multi-factor authentication and why it matters.',
              estimatedTime: 20,
              content: 'Covers MFA concepts and tools to secure your accounts.',
              category: categoryMap['Authentication Control'],
          },
          {
              title: 'Online Privacy Strategies',
              description: 'Tips and techniques for staying safe online.',
              estimatedTime: 25,
              content: 'Learn how to use strong passwords and protect your data.',
              category: categoryMap['Online Safety and Privacy'],
          },
      ];

        await Module.insertMany(modules);
        console.log('Modules seeded.');

        // Seed badges
        const badges = [
            { title: 'Cyber Beginner', description: 'Awarded for completing the first quiz.' },
            { title: 'Privacy Protector', description: 'Awarded for learning about privacy tips.' },
        ];

        await Badge.insertMany(badges);
        console.log('Badges seeded.');

        // Seed resources
        const resources = [
            {
                title: 'Understanding Cybersecurity Basics',
                description: 'Dive into the foundational concepts of cybersecurity.',
                url: 'https://example.com/cybersecurity-basics',
                category: categoryMap['Cybersecurity Essentials'], // Reference the correct category
            },
            {
                title: 'Online Safety Guidelines',
                description: 'Learn how to stay safe online with practical tips.',
                url: 'https://example.com/online-safety',
                category: categoryMap['Online Safety and Privacy'], // Reference the correct category
            },
            {
                title: 'Multi-Factor Authentication Explained',
                description: 'Discover the importance of multi-factor authentication.',
                url: 'https://example.com/mfa-explained',
                category: categoryMap['Authentication Control'], // Reference the correct category
            },
        ];

        await Resource.insertMany(resources);
        console.log('Resources seeded.');

        mongoose.connection.close();
        console.log('Seeding completed and connection closed.');
    } catch (err) {
        console.error('Error seeding data:', err);
        mongoose.connection.close();
    }
};

// Run the seed function
seedData();
