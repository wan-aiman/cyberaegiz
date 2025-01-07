import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <div className="about-us">
            <div className="about-us-banner">
                <h1>About CyberAegiz</h1>
                <p>Your trusted partner in cybersecurity education and protection.</p>
            </div>
            <div className="about-us-content">
                <h2>Our Mission</h2>
                <p>
                    At CyberAegiz, we aim to empower individuals and organizations to navigate the digital world safely.
                    By providing innovative tools and educational resources, we foster a culture of security awareness and best practices.
                </p>

                <h2>What We Offer</h2>
                <ul>
                    <li>Real-time phishing detection to protect against online threats.</li>
                    <li>Robust password management to keep your accounts secure.</li>
                    <li>Advanced encryption and decryption services for safeguarding sensitive data.</li>
                    <li>Interactive security awareness training for workplace readiness.</li>
                </ul>

                <h2>Our Vision</h2>
                <p>
                    To create a world where cybersecurity knowledge is accessible to all, ensuring safer digital interactions
                    and a reduced threat landscape for everyone.
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
