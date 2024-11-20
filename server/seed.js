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
            { name: 'Threat Recognition & Response', description: 'Recognize and respond to cyber threats.' },
            { name: 'Data Protection', description: 'Best practices to protect sensitive data.' },

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
          // Cybersecurity Essentials
          {
              title: 'Cybersecurity Basics',
              description: 'Understand the key principles of cybersecurity and how to protect yourself online.',
              estimatedTime: 30,
              content: [
                  { title: 'Phishing Awareness', details: 'Learn to recognize phishing emails and avoid scams.' },
                  { title: 'Malware Protection', details: 'Understand malware types and how to protect against them.' },
                  { title: 'Safe Browsing Practices', details: 'Use secure websites and avoid risky online behavior.' },
                  { title: 'Strong Passwords', details: 'Create and use passwords that protect your accounts effectively.' },
              ],
              category: categoryMap['Cybersecurity Essentials'],
          },
          {
              title: 'Network Security Basics',
              description: 'Learn how networks can be secured against attacks.',
              estimatedTime: 40,
              content: [
                  { title: 'Firewalls', details: 'Understand how firewalls block unwanted traffic.' },
                  { title: 'Wi-Fi Security', details: 'Secure your wireless networks against intruders.' },
                  { title: 'Virtual Private Networks (VPN)', details: 'How VPNs protect your data in transit.' },
                  { title: 'Intrusion Detection Systems', details: 'Detect and respond to unauthorized network access.' },
              ],
              category: categoryMap['Cybersecurity Essentials'],
          },
          {
              title: 'Incident Response 101',
              description: 'What to do when a cybersecurity incident occurs.',
              estimatedTime: 35,
              content: [
                  { title: 'Detecting Breaches', details: 'Spot unusual activity or unauthorized access.' },
                  { title: 'Mitigating Damage', details: 'Take immediate steps to contain incidents.' },
                  { title: 'Notifying Stakeholders', details: 'Understand when and how to escalate incidents.' },
                  { title: 'Post-Incident Analysis', details: 'Learn from incidents to strengthen defenses.' },
              ],
              category: categoryMap['Cybersecurity Essentials'],
          },
      
          // Online Safety and Privacy
          {
              title: 'Online Privacy Strategies',
              description: 'Explore methods to safeguard your online presence.',
              estimatedTime: 25,
              content: [
                  { title: 'Protecting Personal Data', details: 'Minimize data exposure and sharing online.' },
                  { title: 'Secure Social Media Use', details: 'Adjust privacy settings and limit information sharing.' },
                  { title: 'Avoiding Online Tracking', details: 'Use privacy tools like Ghostery and Privacy Badger.' },
                  { title: 'Using Secure Browsers', details: 'Switch to secure browsers like Brave or Firefox.' },
              ],
              category: categoryMap['Online Safety and Privacy'],
          },
          {
              title: 'Safe Social Media Practices',
              description: 'Minimize risks while using social media platforms.',
              estimatedTime: 30,
              content: [
                  { title: 'Privacy Settings', details: 'Control who can see your posts and profile information.' },
                  { title: 'Recognizing Scams', details: 'Avoid fraudulent messages and fake accounts.' },
                  { title: 'Strong Authentication', details: 'Enable MFA for your social media accounts.' },
                  { title: 'Reviewing Permissions', details: 'Limit app permissions to access social accounts.' },
              ],
              category: categoryMap['Online Safety and Privacy'],
          },
          {
              title: 'Avoiding Scams Online',
              description: 'Learn to identify and avoid common online scams.',
              estimatedTime: 20,
              content: [
                  { title: 'Spotting Fake Websites', details: 'Verify URLs before entering sensitive data.' },
                  { title: 'Recognizing Phishing Attempts', details: 'Be cautious of unsolicited emails and messages.' },
                  { title: 'Avoiding Overpromises', details: 'Beware of deals that seem too good to be true.' },
                  { title: 'Secure Transactions', details: 'Use trusted payment methods when buying online.' },
              ],
              category: categoryMap['Online Safety and Privacy'],
          },
      
          // Authentication Control
          {
              title: 'Understanding MFA',
              description: 'Learn how multi-factor authentication protects your accounts.',
              estimatedTime: 20,
              content: [
                  { title: 'What is MFA?', details: 'Add an extra layer of security to your accounts.' },
                  { title: 'Popular MFA Methods', details: 'Use authenticator apps or biometric authentication.' },
                  { title: 'Setting Up MFA', details: 'Learn how to enable MFA for your accounts.' },
                  { title: 'Recovering Access', details: 'What to do if you lose access to your MFA device.' },
              ],
              category: categoryMap['Authentication Control'],
          },
          {
              title: 'Strong Authentication Practices',
              description: 'Best practices for secure authentication.',
              estimatedTime: 25,
              content: [
                  { title: 'Passwordless Authentication', details: 'Using biometrics or email links instead of passwords.' },
                  { title: 'Password Reuse Risks', details: 'Avoid reusing passwords across accounts.' },
                  { title: 'Recovery Codes', details: 'Securely store backup codes for emergencies.' },
                  { title: 'Session Management', details: 'Regularly log out of accounts on shared devices.' },
              ],
              category: categoryMap['Authentication Control'],
          },
          {
              title: 'Account Recovery Steps',
              description: 'Learn how to recover compromised or locked accounts.',
              estimatedTime: 30,
              content: [
                  { title: 'Identifying Compromise', details: 'Signs that your account may be hacked.' },
                  { title: 'Resetting Passwords', details: 'Use secure recovery methods to regain access.' },
                  { title: 'Notifying Services', details: 'Report unauthorized activity to account providers.' },
                  { title: 'Preventing Future Attacks', details: 'Strengthen your defenses to avoid recurrence.' },
              ],
              category: categoryMap['Authentication Control'],
          },

          // Threat Recognition & Response
          {
            title: 'Recognizing Cyber Threats',
            description: 'Learn how to identify potential cyber threats in your environment.',
            estimatedTime: 30,
            content: [
                { title: 'Identifying Malware', details: 'Recognize signs of malware like unusual system behavior or pop-ups.' },
                { title: 'Phishing Emails', details: 'Spot fraudulent emails designed to steal sensitive information.' },
                { title: 'Social Engineering Tactics', details: 'Understand manipulation techniques used by attackers.' },
                { title: 'Unusual Network Activity', details: 'Monitor for unknown devices or unexpected traffic.' },
            ],
            category: categoryMap['Threat Recognition & Response'],
          },
          {
            title: 'Responding to Cyber Incidents',
            description: 'Steps to take when encountering cyber incidents.',
            estimatedTime: 35,
            content: [
                { title: 'Isolating the Threat', details: 'Disconnect affected devices from the network.' },
                { title: 'Gathering Evidence', details: 'Document and preserve data related to the incident.' },
                { title: 'Notifying IT Teams', details: 'Report the issue to internal IT or cybersecurity staff.' },
                { title: 'Follow-Up Actions', details: 'Implement preventive measures to avoid future attacks.' },
            ],
            category: categoryMap['Threat Recognition & Response'],
          },
          {
            title: 'Incident Reporting Essentials',
            description: 'Learn how to effectively report cybersecurity incidents.',
            estimatedTime: 25,
            content: [
                { title: 'What to Report', details: 'Include details like timestamps, affected systems, and user actions.' },
                { title: 'Who to Notify', details: 'Contact IT teams, management, or legal authorities as needed.' },
                { title: 'Maintaining Confidentiality', details: 'Ensure sensitive information is shared securely.' },
                { title: 'Post-Report Procedures', details: 'Work with stakeholders to resolve and analyze incidents.' },
            ],
            category: categoryMap['Threat Recognition & Response'],
          },

          // Data Protection
          {
            title: 'Data Classification & Sensitivity',
            description: 'Understand the importance of classifying and securing sensitive data.',
            estimatedTime: 30,
            content: [
                { title: 'Data Categories', details: 'Differentiate between public, private, and confidential data.' },
                { title: 'Access Controls', details: 'Restrict access to sensitive data based on roles and permissions.' },
                { title: 'Data Encryption', details: 'Use encryption tools to protect data in transit and at rest.' },
                { title: 'Backup Strategies', details: 'Regularly back up data to prevent loss or corruption.' },
            ],
            category: categoryMap['Data Protection'],
          },
          {
            title: 'Preventing Data Breaches',
            description: 'Learn strategies to avoid accidental or malicious data breaches.',
            estimatedTime: 35,
            content: [
                { title: 'Regular Updates', details: 'Keep software and systems up to date with the latest patches.' },
                { title: 'Strong Access Policies', details: 'Use least privilege principles to limit data access.' },
                { title: 'Monitoring & Auditing', details: 'Regularly review access logs and detect unusual activity.' },
                { title: 'Third-Party Risks', details: 'Vet vendors and partners for secure data practices.' },
            ],
            category: categoryMap['Data Protection'],
          },
          {
            title: 'Data Privacy Compliance',
            description: 'Understand data privacy laws and compliance requirements.',
            estimatedTime: 40,
            content: [
                { title: 'GDPR Overview', details: 'Learn key principles of the General Data Protection Regulation.' },
                { title: 'Data Minimization', details: 'Collect only the data necessary for your operations.' },
                { title: 'User Consent', details: 'Ensure explicit consent before collecting personal data.' },
                { title: 'Responding to Requests', details: 'Handle user requests to access, modify, or delete their data.' },
            ],
            category: categoryMap['Data Protection'],
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
