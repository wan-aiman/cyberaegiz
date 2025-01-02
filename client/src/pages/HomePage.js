// src/HomePage.js
import React from 'react';
import './HomePage.css';

const HomePage = () => {
    return (
        <main>
            <section className="welcome">
                <div className="welcome-text">
                    <h1>Welcome to <span className="highlight">CyberAegiz</span></h1>
                    <p>Your security is our priority. Explore our cutting-edge cybersecurity solutions that protect your digital assets effectively. From threat detection to responsive action, our features cover all aspects of security.</p><br />
                    <a href="#" className="learn-more">Learn More</a>
                </div>
                <div className="welcome-image">
                    <img src="homeSecAlert.png" alt="Security Alert" />
                </div>
            </section>
            
            <section className="features">
                <h2>Secure Your Digital World In a Single System</h2>
                <div className="feature-grid">
                    <a href="/phishing-detection" className="feature-item">
                        <img src="phishing.png" alt="Phishing Detection" />
                        <h3>Phishing Detection</h3><br />
                        <p>Secure your online experience with real-time phishing threat alerts.</p>
                    </a>
                    <a href="/password-management" className="feature-item">
                        <img src="password.png" alt="Password Management" />
                        <h3>Password Management</h3>
                        <p>Create new passwords or analyze your existing passwords with this tool.</p>
                    </a>
                    <a href="/encryption-decryption" className="feature-item">
                        <img src="encryption.png" alt="Encryption & Decryption" />
                        <h3>Encryption & Decryption</h3>
                        <p>Protect your data with powerful encryption & decryption technology.</p>
                    </a>
                    <a href="/education-hub" className="feature-item">
                        <img src="education.png" alt="Education Hub" />
                        <h3>Security Awareness Training</h3><br />
                        <p>Expand your knowledge and stay updated on current cybersecurity issues.</p>
                    </a>
                </div>
            </section>
            
            <section className="fortify">
                <div className="fortify-text">
                    <div className="fortify-subtext">
                        <h2>Fortifying Your Digital Life</h2>
                        <p>Get all of your cybersecurity needs from here and nowhere else. Strengthen the security of your digital life now.</p>
                        <a href="#" className="register-now">Register Now</a>
                    </div>
                    <img src="fortify.png" alt="Fortify" /><br />
                </div>
            </section>
            
            <section className="defense">
                <div className="defense-text">
                    <img src="firstlinedefense.png" alt="First Line of Defense" />
                    <div className="defense-subtext">
                        <h2><span className="highlight">CyberAegiz</span> as Your First Line of Defense</h2>
                        <p>As the digital world expands, the sophistication and frequency of cyber threats evolve, exposing individuals and organizations to new vulnerabilities. Conventional cybersecurity solutions often offer segmented services, focusing on singular aspects of security like phishing detection, password management, or data encryption. While these tools provide essential security functions, they typically operate in isolation, lacking the ability to offer a comprehensive, integrated defense mechanism against the broad spectrum of digital threats.</p>
                    </div>
                </div>
            </section>
            
            <section className="audience">
                <h2>Get all of your cybersecurity needs within a single system</h2>
                <p>Who is CyberAegiz suitable for?</p>
                <div className="audience-grid">
                    <div className="audience-item">
                        <img src="individuals.png" alt="Individuals" />
                        <h3>Individuals</h3>
                        <p>Safeguard Your Personal Data with Pro-Level Cybersecurity Tools</p>
                    </div>
                    <div className="audience-item">
                        <img src="smes.png" alt="SMEs" />
                        <h3>SMEs</h3>
                        <p>Protect Your Business with Scalable Cybersecurity Solutions Tailored for SMEs</p>
                    </div>
                    <div className="audience-item">
                        <img src="ITProffesionals.png" alt="IT Professionals" />
                        <h3>IT Professionals</h3>
                        <p>Advance Your Cybersecurity Expertise with High-Impact Resources for IT Professionals</p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default HomePage;