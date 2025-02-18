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
        
        const seedQuizzes = async () => {
            const modules = await Module.find(); // Fetch all modules
            const moduleMap = {};
            modules.forEach((mod) => {
                moduleMap[mod.title] = mod._id; // Map modules by title
            });
        
            const quizzes = [
                {
                    title: 'Cybersecurity Basics Quiz',
                    module: moduleMap['Cybersecurity Basics'], // Link to a specific module
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
                {
                    title: 'Authentication Control Quiz',
                    module: moduleMap['Understanding MFA'], // Link to another module
                    questions: [
                        {
                            question: 'What is the primary benefit of MFA?',
                            options: [
                                'Faster login times',
                                'Increased security',
                                'Ease of password recovery',
                            ],
                            correctAnswer: 'Increased security',
                        },
                        {
                            question: 'Which method is NOT considered MFA?',
                            options: ['Password and OTP', 'Biometric and PIN', 'Username and Password'],
                            correctAnswer: 'Username and Password',
                        },
                    ],
                },
            ];
        
            await Quiz.insertMany(quizzes);
            console.log('Quizzes seeded successfully.');
        };
        
        module.exports = seedQuizzes;
        

        // Seed modules
        const modules = [
            {
              title: 'Cybersecurity Basics',
              description: 'Understand the key principles of cybersecurity and how to protect yourself online in today’s evolving digital landscape.',
              estimatedTime: 60,
              content: [
                {
                  title: 'Phishing Awareness',
                  details: 'Phishing is one of the most common cyber threats businesses face today. It involves tricking employees into sharing sensitive information, such as login credentials or financial details, through deceptive emails, websites, or messages.',
                  keyPoints: [
                    'Always verify the sender’s identity through official channels.',
                    'Avoid clicking on suspicious links or downloading attachments from unknown sources.',
                    'Use email security tools that flag suspicious messages.',
                    'Report any phishing attempts to your IT department.',
                  ],
                  videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                },
                {
                  title: 'Malware Protection',
                  details: 'Malware, or malicious software, can infiltrate systems through emails, downloads, or infected websites. In a business environment, malware can lead to data breaches, operational disruptions, and significant financial loss.',
                  keyPoints: [
                    'Install and regularly update antivirus software.',
                    'Avoid downloading files from untrusted websites or email attachments.',
                    'Ensure the company’s operating systems and software are always up-to-date.',
                    'Educate employees about the risks of downloading unknown files.',
                  ],
                  videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                },
                {
                  title: 'Safe Browsing Practices',
                  details: 'Unsafe browsing habits can expose employees and businesses to significant cybersecurity threats. Navigating unsecured websites or clicking on ads can lead to malware infections or data theft.',
                  keyPoints: [
                    'Always look for "HTTPS" in the URL when browsing websites.',
                    'Avoid using public Wi-Fi for accessing sensitive company data unless a VPN is in use.',
                    'Regularly clear cookies and cached data to minimize tracking.',
                    'Disable pop-ups and avoid clicking on banner ads.',
                  ],
                  videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                },
                {
                  title: 'Strong Passwords',
                  details: 'Weak passwords are one of the easiest entry points for hackers. Inadequate password security can compromise sensitive business accounts, leading to unauthorized access to systems and data.',
                  keyPoints: [
                    'Create passwords that are at least 12 characters long and include uppercase, lowercase, numbers, and symbols.',
                    'Avoid using personal information, like birthdays, in passwords.',
                    'Use a password manager to generate and store complex passwords securely.',
                    'Enable multi-factor authentication (MFA) wherever possible.',
                  ],
                  videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                },
              ],
              category: categoryMap['Cybersecurity Essentials'],
              image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            },
            {
                title: 'Network Security Basics',
                description: 'Understand how to safeguard your organization’s network from potential threats and ensure secure communication across devices and systems.',
                estimatedTime: 60,
                content: [
                  {
                    title: 'Firewalls',
                    details: 'Firewalls are a critical line of defense for any network. They act as a barrier between your internal network and external threats, filtering traffic based on a set of predefined security rules. Without a firewall, a network is exposed to unauthorized access, malware, and other cyber threats.',
                    keyPoints: [
                      'Monitor and control incoming and outgoing network traffic.',
                      'Block unauthorized access to sensitive systems and data.',
                      'Use application-layer firewalls for deeper traffic inspection.',
                      'Regularly update firewall rules to address new threats.',
                    ],
                    videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                  },
                  {
                    title: 'Wi-Fi Security',
                    details: 'Securing your organization’s wireless networks is essential to prevent unauthorized access and protect sensitive data. An unprotected Wi-Fi network is a gateway for attackers to intercept communications, plant malware, or exploit vulnerabilities.',
                    keyPoints: [
                      'Always use WPA3 or WPA2 encryption protocols for your Wi-Fi.',
                      'Change default router login credentials to a strong, unique password.',
                      'Regularly monitor and update firmware to patch security vulnerabilities.',
                      'Set up guest networks for visitors to isolate internal systems.',
                    ],
                    videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                  },
                  {
                    title: 'Virtual Private Networks (VPN)',
                    details: 'A Virtual Private Network (VPN) encrypts internet connections, ensuring that sensitive data remains secure even when accessed over public networks. VPNs are indispensable for remote employees who need to access internal company systems securely.',
                    keyPoints: [
                      'Encrypts all internet traffic, protecting data from interception.',
                      'Masks your IP address, providing anonymity online.',
                      'Enable split-tunneling to balance security and performance.',
                      'Choose a VPN provider that ensures a no-logs policy.',
                    ],
                    videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                  },
                  {
                    title: 'Intrusion Detection Systems (IDS)',
                    details: 'An Intrusion Detection System (IDS) monitors network traffic for unusual activity that might indicate a security breach. It complements firewalls by identifying and alerting administrators about potential threats.',
                    keyPoints: [
                      'Identify unauthorized access attempts or malicious activities.',
                      'Use host-based IDS (HIDS) for monitoring specific devices.',
                      'Deploy network-based IDS (NIDS) to scan entire network traffic.',
                      'Integrate IDS with firewalls for automated threat responses.',
                    ],
                    videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                  },
                ],
                category: categoryMap['Cybersecurity Essentials'],
                image: 'https://cdn.pixabay.com/photo/2018/09/09/08/36/network-3664108_960_720.jpg',
              },
              {
                title: 'Incident Response 101',
                description: 'Learn essential steps to effectively handle and recover from cybersecurity incidents, minimizing damage and restoring operations quickly.',
                estimatedTime: 60,
                content: [
                  {
                    title: 'Detecting Breaches',
                    details: 'Early detection of security breaches can significantly reduce their impact. Spotting signs like unusual login patterns, unapproved software installations, or unexplained system slowdowns is critical to an effective response.',
                    keyPoints: [
                      'Use real-time monitoring tools to track system activities.',
                      'Train employees to report suspicious emails or messages promptly.',
                      'Audit system logs regularly for unauthorized access attempts.',
                      'Employ behavioral analysis tools to identify anomalies.',
                    ],
                    videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                  },
                  {
                    title: 'Mitigating Damage',
                    details: 'When a breach occurs, containing the threat is the top priority. Quick action prevents attackers from further exploiting the system and limits damage to critical data and operations.',
                    keyPoints: [
                      'Disconnect compromised devices from the network immediately.',
                      'Revoke compromised credentials and issue secure replacements.',
                      'Activate backup systems to maintain business continuity.',
                      'Coordinate with cybersecurity experts to assess and neutralize threats.',
                    ],
                    videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                  },
                  {
                    title: 'Notifying Stakeholders',
                    details: 'Clear and timely communication during a cybersecurity incident ensures that all stakeholders are informed and prepared to take necessary actions. Transparency can also protect your organization’s reputation.',
                    keyPoints: [
                      'Notify IT teams, management, and external security consultants as needed.',
                      'Inform affected customers while adhering to data privacy regulations.',
                      'Ensure that all communications are clear, accurate, and non-alarming.',
                      'Provide stakeholders with actionable steps to minimize impact.',
                    ],
                    videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                  },
                  {
                    title: 'Post-Incident Analysis',
                    details: 'Learning from incidents is a key part of improving your organization’s cybersecurity posture. A thorough analysis of what went wrong helps in building stronger defenses for the future.',
                    keyPoints: [
                      'Conduct a root cause analysis to identify vulnerabilities.',
                      'Update policies, procedures, and tools to address identified gaps.',
                      'Document the incident and share lessons learned with the team.',
                      'Schedule follow-up audits to ensure preventive measures are effective.',
                    ],
                    videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                  },
                ],
                category: categoryMap['Cybersecurity Essentials'],
                image: 'https://cdn.pixabay.com/photo/2020/04/14/16/24/security-5043368_960_720.jpg',
              },              
      
          // Online Safety and Privacy
          {
            title: 'Online Privacy Strategies',
            description: 'Learn how to safeguard your online presence by adopting effective privacy practices and minimizing digital footprints.',
            estimatedTime: 60,
            content: [
              {
                title: 'Protecting Personal Data',
                details: 'Personal data, such as your name, address, and financial information, is a prime target for cybercriminals. Protecting this data ensures that your identity and finances remain secure while minimizing risks of fraud and breaches.',
                keyPoints: [
                  'Avoid sharing sensitive personal information on unsecured platforms.',
                  'Review privacy policies before providing personal data to websites.',
                  'Encrypt sensitive files and communications where possible.',
                  'Regularly monitor your credit reports and financial accounts for signs of identity theft.',
                ],
                videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
              },
              {
                title: 'Secure Social Media Use',
                details: 'Social media platforms are common targets for hackers due to the wealth of personal information they contain. By managing privacy settings and controlling what you share, you can minimize exposure to risks.',
                keyPoints: [
                  'Set your social media profiles to private to control who sees your content.',
                  'Avoid posting details about your location, vacations, or daily routines.',
                  'Be cautious about accepting friend requests from unknown individuals.',
                  'Review third-party app permissions and revoke unnecessary access.',
                ],
                videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
              },
              {
                title: 'Avoiding Online Tracking',
                details: 'Online tracking tools like cookies and trackers collect user data for various purposes, including advertising and profiling. Limiting tracking can help maintain your privacy and prevent data misuse.',
                keyPoints: [
                  'Use browser extensions like Ghostery or Privacy Badger to block trackers.',
                  'Regularly clear cookies and browsing history from your web browser.',
                  'Enable Do Not Track settings in your browser to minimize tracking.',
                  'Consider using privacy-focused search engines like DuckDuckGo.',
                ],
                videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
              },
              {
                title: 'Using Secure Browsers',
                details: 'Secure browsers provide enhanced privacy features that protect you from online threats. These browsers are designed to limit tracking and provide a safer browsing experience.',
                keyPoints: [
                  'Switch to browsers like Brave, Firefox, or Tor for better privacy.',
                  'Enable HTTPS Everywhere to ensure secure connections to websites.',
                  'Disable third-party cookies to reduce tracking by advertisers.',
                  'Keep your browser updated to the latest version for maximum security.',
                ],
                videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
              },
            ],
            category: categoryMap['Online Safety and Privacy'],
            image: 'https://images.pexels.com/photos/211151/pexels-photo-211151.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
            {
                title: 'Enhancing Digital Footprint Awareness',
                description: 'Understand the impact of your digital footprint and learn strategies to minimize risks associated with online activities.',
                estimatedTime: 60,
                content: [
                    {
                        title: 'What is a Digital Footprint?',
                        details: 'A digital footprint is the trail of data you leave behind when using the internet. This includes anything from social media posts to online purchases. Understanding your footprint is crucial to managing privacy risks effectively.',
                        keyPoints: [
                            'Differentiate between active and passive digital footprints.',
                            'Understand how data collection works on websites and apps.',
                            'Learn the implications of oversharing personal information.',
                            'Know how your digital footprint can affect your personal and professional life.',
                        ],
                        videoUrl: 'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                    },
                    {
                        title: 'Managing Privacy Settings',
                        details: 'Adjusting privacy settings on platforms you use frequently can significantly reduce your exposure to unwanted data collection and cyber threats.',
                        keyPoints: [
                            'Regularly review and update privacy settings on social media platforms.',
                            'Turn off location tracking on apps unless necessary.',
                            'Limit who can view your online profiles and personal information.',
                            'Use privacy-focused browsers and search engines for enhanced protection.',
                        ],
                        videoUrl: 'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                    },
                    {
                        title: 'Protecting Yourself from Data Exploitation',
                        details: 'Data brokers and advertisers often exploit your online activities for targeted ads or profiling. Learn how to mitigate this through proactive measures.',
                        keyPoints: [
                            'Opt-out of data collection services where possible.',
                            'Install browser extensions like uBlock Origin to block ads and trackers.',
                            'Use temporary or disposable email addresses for non-essential sign-ups.',
                            'Be cautious of apps requesting excessive permissions.',
                        ],
                        videoUrl: 'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                    },
                    {
                        title: 'Minimizing Your Digital Footprint',
                        details: 'Reducing the size of your digital footprint lowers your risk of being targeted by cybercriminals and minimizes long-term data exposure.',
                        keyPoints: [
                            'Regularly delete old accounts you no longer use.',
                            'Use secure platforms for sensitive communications and transactions.',
                            'Clear browser history and cookies regularly to avoid unnecessary tracking.',
                            'Think twice before sharing personal information online.',
                        ],
                        videoUrl: 'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                    },
                ],
                category: categoryMap['Online Safety and Privacy'],
                image: 'https://img.freepik.com/free-photo/senior-man-receiving-positive-reactions-from-social-media_53876-105688.jpg?semt=ais_hybrid',
            },
                    
              {
                title: 'Safe Social Media Practices',
                description: 'Understand how to navigate social media platforms safely, protect your accounts, and minimize exposure to scams and risks.',
                estimatedTime: 60,
                content: [
                  {
                    title: 'Privacy Settings',
                    details: 'Adjusting privacy settings on social media platforms ensures that you control who can view your posts, profile information, and activities. This is critical for protecting personal information from unwanted attention.',
                    keyPoints: [
                      'Set profiles to private and limit visibility to friends or approved connections.',
                      'Review and update privacy settings regularly to align with platform updates.',
                      'Restrict who can send you friend requests or message you directly.',
                      'Limit the visibility of your contact details and personal information.',
                    ],
                    videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                  },
                  {
                    title: 'Recognizing Scams',
                    details: 'Social media scams often involve fake profiles, phishing attempts, and malicious links. Recognizing these threats is essential to avoid falling victim to fraud or identity theft.',
                    keyPoints: [
                      'Verify the authenticity of profiles before interacting or sharing information.',
                      'Avoid clicking on unsolicited links in messages or posts.',
                      'Be cautious of offers or messages that sound too good to be true.',
                      'Report and block suspicious accounts to the platform’s support team.',
                    ],
                    videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                  },
                  {
                    title: 'Strong Authentication',
                    details: 'Using strong authentication methods, such as multi-factor authentication (MFA), can significantly enhance the security of your social media accounts, preventing unauthorized access.',
                    keyPoints: [
                      'Enable MFA on all social media accounts for added protection.',
                      'Use unique and complex passwords for each account.',
                      'Secure backup codes for MFA in a safe location.',
                      'Avoid logging in to social accounts on shared or public devices.',
                    ],
                    videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                  },
                  {
                    title: 'Reviewing Permissions',
                    details: 'Third-party apps often request access to your social media accounts for functionality, but excessive permissions can compromise your privacy. Reviewing and managing these permissions is crucial.',
                    keyPoints: [
                      'Regularly audit the list of connected apps on your social accounts.',
                      'Revoke access for apps you no longer use or recognize.',
                      'Limit permissions to only those necessary for the app’s functionality.',
                      'Be cautious when granting access to new apps, especially those with vague privacy policies.',
                    ],
                    videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                  },
                ],
                category: categoryMap['Online Safety and Privacy'],
                image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600',
              },              
              {
                title: 'Strong Authentication Practices',
                description: 'Explore the best practices for creating and maintaining secure authentication methods to protect sensitive accounts.',
                estimatedTime: 60,
                content: [
                  {
                    title: 'Passwordless Authentication',
                    details: 'Passwordless authentication eliminates the need for traditional passwords by using more secure and convenient alternatives. This method reduces the risk of password breaches and enhances user experience.',
                    keyPoints: [
                      'Biometric Authentication: Use fingerprints or facial recognition for secure and easy access.',
                      'Email or SMS Links: Authenticate users by sending a one-time login link or code.',
                      'Hardware Tokens: Employ physical devices like YubiKeys to verify identity.',
                      'Improved Security: Eliminates vulnerabilities associated with weak or reused passwords.',
                    ],
                    videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                  },
                  {
                    title: 'Password Reuse Risks',
                    details: 'Reusing passwords across multiple accounts poses a significant security risk. If one account is breached, attackers can gain access to other accounts using the same credentials.',
                    keyPoints: [
                      'Use unique passwords for every account to minimize damage from breaches.',
                      'Employ a password manager to generate and securely store complex passwords.',
                      'Avoid using variations of the same password, such as adding numbers or symbols.',
                      'Monitor for data breach notifications and update affected passwords immediately.',
                    ],
                    videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                  },
                  {
                    title: 'Recovery Codes',
                    details: 'Recovery codes act as a safety net for regaining access to accounts in case of MFA device loss or issues. Properly managing these codes is essential for account security.',
                    keyPoints: [
                      'Securely store recovery codes in a password manager or encrypted file.',
                      'Avoid keeping codes in easily accessible or insecure locations, such as email.',
                      'Regularly update recovery codes if they are compromised or as part of routine maintenance.',
                      'Test recovery codes periodically to ensure they work as intended.',
                    ],
                    videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                  },
                  {
                    title: 'Session Management',
                    details: 'Session management practices help prevent unauthorized access to accounts by ensuring sessions are properly secured and terminated.',
                    keyPoints: [
                      'Log out of accounts on shared or public devices immediately after use.',
                      'Enable automatic session timeouts to log out inactive users.',
                      'Avoid saving login credentials on devices or browsers shared with others.',
                      'Regularly review active sessions and terminate any unauthorized or suspicious activity.',
                    ],
                    videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                  },
                ],
                category: categoryMap['Authentication Control'],
                image: 'https://img.freepik.com/free-photo/biometric-technology-background-with-fingerprint-scanning-system-virtual-screen-digital-remix_53876-104937.jpg?semt=ais_hybrid',
              },
              {
                title: 'Account Recovery Steps',
                description: 'Understand the essential steps to recover access to compromised or locked accounts while strengthening security.',
                estimatedTime: 60,
                content: [
                  {
                    title: 'Identifying Compromise',
                    details: 'Recognizing signs of account compromise early is critical to minimizing damage. Monitoring for unusual activity can help prevent further exploitation.',
                    keyPoints: [
                      'Watch for unauthorized logins or unfamiliar devices accessing your account.',
                      'Look for changes to account settings, such as email or password updates.',
                      'Monitor for unrecognized transactions or activity within accounts.',
                      'Enable alerts for suspicious login attempts to stay informed.',
                    ],
                    videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                  },
                  {
                    title: 'Resetting Passwords',
                    details: 'Resetting passwords is a fundamental step in account recovery. Ensure new passwords are strong and unique to prevent future incidents.',
                    keyPoints: [
                      'Use secure recovery methods, such as email or SMS, to reset passwords.',
                      'Create strong, unique passwords that meet or exceed recommended guidelines.',
                      'Avoid reusing compromised passwords for any accounts.',
                      'Enable multi-factor authentication (MFA) immediately after resetting passwords.',
                    ],
                    videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                  },
                  {
                    title: 'Notifying Services',
                    details: 'Reporting unauthorized activity to service providers ensures timely action to secure accounts and limit further damage.',
                    keyPoints: [
                      'Contact the account provider’s support team or security department.',
                      'Provide detailed information about the unauthorized activity or compromise.',
                      'Request temporary account suspension if necessary to prevent further misuse.',
                      'Follow the provider’s recommended steps for securing your account.',
                    ],
                    videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                  },
                  {
                    title: 'Preventing Future Attacks',
                    details: 'Learning from past incidents is essential to strengthen your defenses and reduce the risk of future compromises.',
                    keyPoints: [
                      'Enable MFA on all accounts to add an extra layer of security.',
                      'Review and update account recovery options regularly.',
                      'Educate yourself about common attack vectors and best practices for online security.',
                      'Monitor your accounts for unusual activity and respond promptly to alerts.',
                    ],
                    videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                  },
                ],
                category: categoryMap['Authentication Control'],
                image: 'https://img.freepik.com/free-photo/recovery-backup-restoration-data-storage-security-concept_53876-133816.jpg?semt=ais_hybrid',
              }, 
              {
                title: 'Advanced MFA Strategies',
                description: 'Explore advanced techniques and best practices to strengthen your accounts using multi-factor authentication (MFA).',
                estimatedTime: 60,
                content: [
                    {
                        title: 'Understanding Advanced MFA Methods',
                        details: 'Multi-factor authentication (MFA) is a key component in modern cybersecurity strategies. Understanding advanced MFA methods enhances your ability to secure sensitive systems and prevent unauthorized access.',
                        keyPoints: [
                            'Leverage biometric authentication methods like facial recognition or fingerprints.',
                            'Use hardware security keys, such as YubiKey, for an added layer of security.',
                            'Combine traditional methods (e.g., passwords) with modern MFA for layered protection.',
                            'Educate users on selecting the right MFA method for their needs.',
                        ],
                        videoUrl: 'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                    },
                    {
                        title: 'Securing MFA Backup Methods',
                        details: 'Ensuring the security of MFA backup methods is crucial to preventing lockouts and unauthorized access. This involves safe handling of backup codes and alternative recovery methods.',
                        keyPoints: [
                            'Store backup codes in a secure and encrypted format.',
                            'Avoid sharing recovery codes with anyone, even trusted individuals.',
                            'Ensure that alternative recovery methods, like email recovery, are secure.',
                            'Regularly update and test your backup methods to ensure their effectiveness.',
                        ],
                        videoUrl: 'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                    },
                    {
                        title: 'Combining MFA with Other Security Measures',
                        details: 'While MFA is powerful, combining it with other security measures creates a comprehensive defense strategy. Learn how to integrate MFA into a broader security framework.',
                        keyPoints: [
                            'Implement MFA alongside firewalls, antivirus software, and intrusion detection systems.',
                            'Use MFA in conjunction with strong password policies to enhance account security.',
                            'Educate employees on spotting phishing attempts that bypass MFA.',
                            'Regularly audit and test the effectiveness of your overall security strategy.',
                        ],
                        videoUrl: 'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                    },
                    {
                        title: 'Future of MFA: What to Expect',
                        details: 'The future of MFA includes advancements like passwordless authentication and continuous authentication. Understanding these trends prepares you for the next wave of cybersecurity innovations.',
                        keyPoints: [
                            'Explore passwordless authentication methods using biometrics or email links.',
                            'Understand continuous authentication systems that monitor user behavior.',
                            'Stay updated on industry standards and trends in authentication technology.',
                            'Prepare for integration of AI and machine learning into MFA systems.',
                        ],
                        videoUrl: 'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                    },
                ],
                category: categoryMap['Authentication Control'],
                image: 'https://img.freepik.com/free-photo/finger-pressing-button-with-padlock_1134-121.jpg?semt=ais_hybrid',
            },                         

          // Threat Recognition & Response
          {
            title: 'Recognizing Cyber Threats',
            description: 'Equip yourself with the knowledge to identify and respond to potential cyber threats in your environment.',
            estimatedTime: 60,
            content: [
              {
                title: 'Identifying Malware',
                details: 'Malware, or malicious software, comes in various forms, including viruses, ransomware, and spyware. Recognizing its presence early is crucial to prevent widespread damage to systems.',
                keyPoints: [
                  'Unusual System Behavior: Watch for slow performance, unexpected crashes, or frequent error messages.',
                  'Pop-ups and Ads: Be wary of intrusive pop-ups or ads that appear even when no browser is open.',
                  'Unauthorized Changes: Monitor for changes to settings or software installations you did not initiate.',
                  'Preventive Measures: Regularly update antivirus software and educate employees about safe downloading practices.',
                ],
                videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
              },
              {
                title: 'Phishing Emails',
                details: 'Phishing emails aim to deceive recipients into revealing sensitive information, such as passwords or financial details. These attacks exploit trust and urgency.',
                keyPoints: [
                  'Check the Sender: Verify the sender’s email address for authenticity.',
                  'Analyze the Content: Look for spelling errors, generic greetings, and unusual requests.',
                  'Avoid Links: Hover over links to check their destination before clicking.',
                  'Use Email Security Tools: Enable spam filters and phishing detection mechanisms.',
                ],
                videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
              },
              {
                title: 'Social Engineering Tactics',
                details: 'Social engineering attacks manipulate human psychology to gain unauthorized access to information or systems. Understanding these tactics is key to avoiding deception.',
                keyPoints: [
                  'Impersonation: Attackers may pretend to be trusted individuals or organizations.',
                  'Urgency and Fear: Be cautious of messages that pressure you to act immediately.',
                  'Baiting: Avoid inserting unknown USB drives or downloading "free" software.',
                  'Verify Requests: Always confirm requests for sensitive information through independent channels.',
                ],
                videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
              },
              {
                title: 'Unusual Network Activity',
                details: 'Monitoring network activity helps detect potential threats early, such as unauthorized devices or excessive data transfers.',
                keyPoints: [
                  'Unknown Devices: Check for devices connected to your network that you do not recognize.',
                  'Data Spikes: Monitor for sudden, unexplained increases in data usage.',
                  'Repeated Login Attempts: Look for multiple failed logins that may indicate brute force attacks.',
                  'Use Network Monitoring Tools: Leverage tools to analyze and visualize network traffic patterns.',
                ],
                videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
              },
            ],
            category: categoryMap['Threat Recognition & Response'],
            image: 'https://img.freepik.com/free-photo/cyber-criminal-wearing-white-mask-while-testing-government-system-cyber-hacker_482257-22970.jpg?semt=ais_hybrid',
          },
          {
            title: 'Responding to Cyber Incidents',
            description: 'Learn actionable steps to manage and mitigate the impact of cybersecurity incidents effectively.',
            estimatedTime: 60,
            content: [
              {
                title: 'Isolating the Threat',
                details: 'The first step in managing a cybersecurity incident is isolating the affected systems to prevent the threat from spreading across the network.',
                keyPoints: [
                  'Disconnect Devices: Immediately unplug affected devices from the network.',
                  'Disable Accounts: Temporarily deactivate accounts that may be compromised.',
                  'Block Malicious IPs: Use firewalls to block IP addresses involved in the attack.',
                  'Minimize Access: Limit system access to essential personnel during the response.',
                ],
                videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
              },
              {
                title: 'Gathering Evidence',
                details: 'Collecting and preserving evidence is crucial for understanding the scope of the incident and supporting forensic analysis.',
                keyPoints: [
                  'Log Activity: Save server and application logs for later review.',
                  'Take Snapshots: Capture the state of affected systems and networks.',
                  'Preserve Files: Store copies of malicious files and emails securely.',
                  'Document Actions: Maintain a record of all actions taken during the response.',
                ],
                videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
              },
              {
                title: 'Notifying IT Teams',
                details: 'Promptly reporting the incident to your organization’s IT or cybersecurity team ensures a coordinated response and minimizes potential damage.',
                keyPoints: [
                  'Provide Details: Share information about the type and scope of the incident.',
                  'Escalate as Needed: Notify higher management or external experts if required.',
                  'Follow Protocols: Adhere to your organization’s incident response plan.',
                  'Coordinate Efforts: Work closely with IT teams to contain and resolve the issue.',
                ],
                videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
              },
              {
                title: 'Follow-Up Actions',
                details: 'After addressing the immediate threat, take steps to strengthen your defenses and prevent similar incidents in the future.',
                keyPoints: [
                  'Conduct Post-Mortem: Analyze the incident to identify vulnerabilities and lessons learned.',
                  'Implement Improvements: Update security policies, software, and training programs.',
                  'Monitor Systems: Increase vigilance for potential follow-up attacks.',
                  'Communicate: Share findings with stakeholders and provide clear next steps.',
                ],
                videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
              },
            ],
            category: categoryMap['Threat Recognition & Response'],
            image: 'https://img.freepik.com/free-photo/protection-surveillance-safety-privacy-policy-concept_53876-128098.jpg?semt=ais_hybrid',
          },
          
          {
            title: 'Incident Reporting Essentials',
            description: 'Learn the crucial steps for effectively reporting cybersecurity incidents within an organization.',
            estimatedTime: 45,
            content: [
              {
                title: 'What to Report',
                details: 'Accurate reporting is essential to address and mitigate cybersecurity incidents effectively. It ensures all stakeholders are aware of the situation and the necessary actions are taken promptly.',
                keyPoints: [
                  'Document Incident Details: Record timestamps, affected systems, and the nature of the incident.',
                  'Include User Actions: Note any actions taken by employees or systems during the incident.',
                  'Highlight Impacts: Describe potential or actual damage, such as data loss or operational disruptions.',
                  'Attach Evidence: Provide relevant files, logs, or screenshots to support the report.',
                ],
                videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
              },
              {
                title: 'Who to Notify',
                details: 'Identifying the appropriate individuals or teams to notify during a cybersecurity incident ensures a swift and coordinated response.',
                keyPoints: [
                  'IT Teams: Inform internal IT staff responsible for managing and securing systems.',
                  'Management: Notify senior management if the incident affects critical business operations.',
                  'Legal Authorities: Contact law enforcement or regulatory bodies for severe incidents or compliance breaches.',
                  'External Partners: Engage third-party cybersecurity experts if additional expertise is required.',
                ],
                videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
              },
              {
                title: 'Maintaining Confidentiality',
                details: 'When reporting incidents, protecting sensitive information is critical to prevent further exploitation or reputational damage.',
                keyPoints: [
                  'Use Secure Channels: Share information using encrypted emails or secure messaging platforms.',
                  'Limit Access: Ensure only authorized personnel can view incident details.',
                  'Anonymize Data: Remove identifiable information unless necessary for investigation.',
                  'Comply with Policies: Follow organizational guidelines for handling sensitive data.',
                ],
                videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
              },
              {
                title: 'Post-Report Procedures',
                details: 'After submitting the incident report, follow through with actions to address vulnerabilities and improve future readiness.',
                keyPoints: [
                  'Collaborate with Stakeholders: Work with IT teams and management to resolve the incident.',
                  'Conduct Root Cause Analysis: Identify the underlying causes to prevent recurrence.',
                  'Update Security Measures: Enhance policies, tools, and training based on lessons learned.',
                  'Communicate Findings: Share incident outcomes and improvements with relevant teams.',
                ],
                videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
              },
            ],
            category: categoryMap['Threat Recognition & Response'],
            image: 'https://img.freepik.com/free-photo/person-presenting-their-job-resignation_23-2149445156.jpg?semt=ais_hybrid',
          },
          {
            title: 'Data Classification & Sensitivity',
            description: 'Understand how classifying and securing sensitive data enhances organizational security.',
            estimatedTime: 50,
            content: [
              {
                title: 'Data Categories',
                details: 'Classifying data into categories ensures the right level of protection and helps prioritize security measures for sensitive information.',
                keyPoints: [
                  'Public Data: Information safe for public access, like press releases.',
                  'Internal Data: Restricted to internal use, such as internal emails.',
                  'Confidential Data: Includes proprietary information, like trade secrets or client records.',
                  'Highly Sensitive Data: Encompasses financial records, medical data, or personal identifiable information (PII).',
                ],
                videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
              },
              {
                title: 'Access Controls',
                details: 'Implementing strong access controls prevents unauthorized access to sensitive data and ensures compliance with regulatory standards.',
                keyPoints: [
                  'Role-Based Access: Assign access permissions based on job roles and responsibilities.',
                  'Least Privilege Principle: Limit access to only what is necessary for specific tasks.',
                  'Two-Factor Authentication: Add an extra layer of security for accessing critical systems.',
                  'Access Logs: Regularly review logs to monitor data access and detect anomalies.',
                ],
                videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
              },
              {
                title: 'Data Encryption',
                details: 'Encryption protects data during storage and transmission, reducing the risk of unauthorized access or interception.',
                keyPoints: [
                  'Encryption Standards: Use strong encryption algorithms like AES-256.',
                  'Encrypt Data at Rest: Secure sensitive files stored on servers or devices.',
                  'Encrypt Data in Transit: Protect information exchanged over networks using SSL/TLS protocols.',
                  'Key Management: Safeguard encryption keys and rotate them periodically.',
                ],
                videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
              },
              {
                title: 'Backup Strategies',
                details: 'Regular backups ensure data recovery in case of breaches, hardware failures, or natural disasters.',
                keyPoints: [
                  'Frequency: Schedule backups daily or weekly based on data sensitivity and volume.',
                  'Storage: Use secure and geographically diverse locations for backups.',
                  'Testing: Periodically test backups to ensure data can be restored successfully.',
                  'Disaster Recovery Plan: Develop a clear plan for restoring data during emergencies.',
                ],
                videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
              },
            ],
            category: categoryMap['Data Protection'],
            image: 'https://img.freepik.com/free-photo/businessman-balanced-financial-foreign-graph-accounting_1421-682.jpg?semt=ais_hybrid',
          },
          
            {
                title: 'Preventing Data Breaches',
                description: 'Learn effective strategies to safeguard sensitive data and avoid both accidental and malicious breaches within an organization.',
                estimatedTime: 50,
                content: [
                  {
                    title: 'Regular Updates',
                    details: 'Keeping software and systems updated is one of the simplest yet most effective ways to prevent data breaches. Vulnerabilities in outdated systems can be exploited by attackers to gain unauthorized access.',
                    keyPoints: [
                      'Install patches as soon as they are released by software vendors.',
                      'Enable automatic updates for critical systems and applications.',
                      'Regularly update firmware on devices like routers and servers.',
                      'Monitor for end-of-life software and migrate to supported versions.',
                    ],
                    videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                  },
                  {
                    title: 'Strong Access Policies',
                    details: 'Limiting access to sensitive data using robust policies ensures that only authorized personnel can access critical systems and information.',
                    keyPoints: [
                      'Implement role-based access control (RBAC) to assign permissions based on job roles.',
                      'Adopt the principle of least privilege (PoLP) to minimize access to only necessary resources.',
                      'Regularly review and update access permissions as roles change.',
                      'Revoke access immediately when employees leave the organization.',
                    ],
                    videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                  },
                  {
                    title: 'Monitoring & Auditing',
                    details: 'Continuous monitoring and regular audits of systems and logs help identify unusual activity that could indicate a data breach.',
                    keyPoints: [
                      'Deploy intrusion detection and prevention systems (IDPS).',
                      'Conduct regular audits of system and access logs.',
                      'Use AI-driven monitoring tools for real-time threat detection.',
                      'Establish procedures for investigating and responding to alerts.',
                    ],
                    videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                  },
                  {
                    title: 'Third-Party Risks',
                    details: 'Vendors and partners with inadequate data security practices can become a weak link in your organization’s defenses.',
                    keyPoints: [
                      'Vet third-party vendors for compliance with security standards.',
                      'Require signed data protection agreements from all partners.',
                      'Limit the data shared with external parties to the minimum required.',
                      'Monitor third-party access to your systems and revoke when unnecessary.',
                    ],
                    videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                  },
                ],
                category: categoryMap['Data Protection'],
                image: 'https://img.freepik.com/free-photo/data-breach-unsecured-warning-sign-concept_53876-120317.jpg?semt=ais_hybrid',
              },
              {
                title: 'Data Privacy Compliance',
                description: 'Gain an in-depth understanding of data privacy laws and compliance requirements to protect user rights and avoid legal penalties.',
                estimatedTime: 60,
                content: [
                  {
                    title: 'GDPR Overview',
                    details: 'The General Data Protection Regulation (GDPR) is a comprehensive law that governs data protection and privacy for individuals in the European Union. Compliance is essential for businesses operating in or serving EU customers.',
                    keyPoints: [
                      'Understand the key principles: transparency, accountability, and security.',
                      'Appoint a Data Protection Officer (DPO) if your organization processes large amounts of data.',
                      'Conduct Data Protection Impact Assessments (DPIAs) for high-risk processing activities.',
                      'Implement mechanisms for obtaining user consent and handling data requests.',
                    ],
                    videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                  },
                  {
                    title: 'Data Minimization',
                    details: 'Data minimization involves collecting only the data necessary for specific purposes, reducing the risk of breaches and misuse.',
                    keyPoints: [
                      'Review data collection practices and eliminate unnecessary fields.',
                      'Store only essential data for the shortest time required.',
                      'Implement automated tools to anonymize or pseudonymize data.',
                      'Train staff on the importance of minimizing data collection.',
                    ],
                    videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                  },
                  {
                    title: 'User Consent',
                    details: 'Obtaining explicit user consent ensures transparency and trust while complying with privacy laws like GDPR and CCPA.',
                    keyPoints: [
                      'Design clear, concise consent forms for users.',
                      'Provide options to opt-out of non-essential data collection.',
                      'Track and record consent for auditing purposes.',
                      'Allow users to revoke consent easily through account settings.',
                    ],
                    videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                  },
                  {
                    title: 'Responding to Requests',
                    details: 'Under privacy laws, users have the right to request access to their data, modify it, or have it deleted. Fulfilling these requests efficiently is critical for compliance.',
                    keyPoints: [
                      'Establish processes for handling data access and deletion requests.',
                      'Verify user identity before fulfilling requests to prevent unauthorized actions.',
                      'Provide requested data in a portable and readable format.',
                      'Respond to requests within legally mandated timeframes (e.g., 30 days under GDPR).',
                    ],
                    videoUrl:'https://www.youtube.com/embed/dUjNVzzqTiA?si=uSvt_LICmH3KLh_a',
                  },
                ],
                category: categoryMap['Data Protection'],
                image: 'https://img.freepik.com/free-photo/businessman-logging-his-tablet_53876-102029.jpg?semt=ais_hybrid',
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
