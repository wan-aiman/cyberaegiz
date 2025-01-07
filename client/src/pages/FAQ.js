import React from 'react';
import './FAQ.css';

const FAQ = () => {
    const faqs = [
        {
            question: 'What is CyberAegiz?',
            answer: 'CyberAegiz is a platform designed to enhance cybersecurity awareness and provide tools for individuals and organizations to protect their digital assets.'
        },
        {
            question: 'How does the phishing detection tool work?',
            answer: 'The phishing detection tool analyzes files, URLs, IPs, and domains using multiple security engines and databases to identify potential threats.'
        },
        {
            question: 'Can I use CyberAegiz tools without prior cybersecurity knowledge?',
            answer: 'Yes, CyberAegiz is designed to be user-friendly and includes educational resources to help users understand and effectively use its tools.'
        },
        {
            question: 'Is my data secure while using CyberAegiz?',
            answer: 'Absolutely. We prioritize user privacy and implement robust encryption and data protection measures to secure your information.'
        },
        {
            question: 'Who can benefit from CyberAegiz?',
            answer: 'Individuals, small to medium enterprises, and employees seeking to improve cybersecurity practices in their workplace can benefit from CyberAegiz.'
        },
    ];

    return (
        <div className="faq-page">
            <div className="faq-banner">
                <h1>Frequently Asked Questions</h1>
                <p>Your questions, answered here.</p>
            </div>
            <div className="faq-content">
                {faqs.map((faq, index) => (
                    <div key={index} className="faq-item">
                        <h2>{faq.question}</h2>
                        <p>{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
