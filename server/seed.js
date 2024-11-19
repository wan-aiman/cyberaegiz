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
              description: 'Understand the key principles of cybersecurity and how to protect yourself online.',
              estimatedTime: 30,
              content: [
                {
                  title: 'Phishing Awareness',
                  details: `
                    Phishing involves fraudulent attempts to steal sensitive information via deceptive emails or websites.
                    - *Key Signs*: Generic greetings, urgent calls to action, and unverified links.
                    - *Practical Tip*: Verify sender details and hover over links before clicking.
                  `,
                },
                {
                  title: 'Malware Protection',
                  details: `
                    Malware refers to malicious software, including viruses, spyware, and ransomware.
                    - *How to Stay Safe*: Use updated antivirus programs and avoid downloads from untrusted sources.
                  `,
                },
                {
                  title: 'Password Best Practices',
                  details: `
                    Strong passwords are crucial for securing accounts.
                    - *Tools*: Password managers like LastPass or Dashlane simplify management and enhance security.
                  `,
                },
                {
                  title: 'Safe Browsing Habits',
                  details: `
                    Recognize secure websites by checking for "https://" and the padlock icon.
                    - Avoid public Wi-Fi for sensitive transactions or use a VPN.
                  `,
                },
              ],
              category: categoryMap['Cybersecurity Essentials'],
            },
            {
              title: 'Understanding MFA',
              description: 'Learn how multi-factor authentication protects your accounts.',
              estimatedTime: 20,
              content: [
                {
                  title: 'What is MFA?',
                  details: `
                    MFA prevents unauthorized access even if passwords are compromised.
                    - Common methods: SMS codes, authenticator apps, or biometric authentication.
                  `,
                },
                {
                  title: 'Types of MFA',
                  details: `
                    - *SMS/Email Verification*: A one-time code sent to your phone or email.
                    - *Authenticator Apps*: Apps like Google Authenticator and Authy generate time-sensitive codes.
                    - *Biometrics*: Fingerprint or facial recognition.
                  `,
                },
                {
                  title: 'How to Enable MFA',
                  details: `
                    - Navigate to the "Security" section of an account.
                    - Link a preferred MFA method (e.g., Google Authenticator).
                    - Save recovery codes for emergencies.
                  `,
                },
                {
                  title: 'Overcoming Challenges',
                  details: `
                    Losing access to your device? Set up multiple verification methods or recovery emails.
                  `,
                },
              ],
              category: categoryMap['Authentication Control'],
            },
            {
              title: 'Online Privacy Strategies',
              description: 'Explore methods to safeguard your online presence.',
              estimatedTime: 25,
              content: [
                {
                  title: 'Data Protection',
                  details: `
                    - Regularly review and update privacy settings on social media.
                    - Use strong, unique passwords and enable MFA.
                  `,
                },
                {
                  title: 'Browser Safety',
                  details: `
                    - Clear cookies and cache to minimize tracking.
                    - Install privacy-enhancing extensions like Privacy Badger or Ghostery.
                  `,
                },
                {
                  title: 'Social Media Awareness',
                  details: `
                    - Be mindful of oversharing personal information online.
                    - Adjust settings to limit visibility of posts and connections.
                  `,
                },
                {
                  title: 'Using VPNs',
                  details: `
                    A VPN encrypts internet traffic, masking your identity on public networks.
                    - Choose a trusted VPN provider like NordVPN or ExpressVPN.
                  `,
                },
              ],
              category: categoryMap['Online Safety and Privacy'],
            },
          ];
          
          module.exports = modules;
          
                   

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
