// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PhishingDetectionPage from './pages/PhishingDetectionPage';
import PasswordManagement from './pages/PasswordManagement';
import HomePage from './pages/HomePage';
import './App.css';
import EncryptionDecryptionPage from './pages/EncryptionDecryptionPage';
import EducationHub from './pages/EducationHub';
import ModuleDetails from './pages/ModuleDetails';
import QuickAssessment from './pages/QuickAssessment';
import AboutUs from './pages/AboutUs';
import TermsOfUse from './pages/TermsOfUse';
import FAQ from './pages/FAQ';

function App() {
    return (
        <Router>
            <div className="App">
                <header>
                    <nav>
                        <div className="logo">
                            <Link to="/">
                                <img src="logo.png" alt="CyberAegiz Logo" />
                            </Link>
                        </div>
                        <ul className="nav-links">
                            <li><Link to="/">Home</Link></li>
                            <li className="dropdown">
                                <button className="dropbtn">Tools ▼</button>
                                <div className="dropdown-content">
                                    <Link to="/phishing-detection">Phishing Detection</Link>
                                    <Link to="/password-management">Password Management</Link>
                                    <Link to="/encryption-decryption">Encryption & Decryption</Link>
                                </div>
                            </li>
                            <li><Link to="/education-hub">Security Awareness Training</Link></li>
                            <div className="login">
                            <a href="https://api.whatsapp.com/send/?phone=60189792807&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="login-button">
                            Contact Us
                            </a>
                            </div>
                        </ul>
                    </nav>
                </header>

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/phishing-detection" element={<PhishingDetectionPage />} />
                    <Route path="/password-management" element={<PasswordManagement />} />
                    <Route path="/encryption-decryption" element={<EncryptionDecryptionPage />} />
                    <Route path="/education-hub" element={<EducationHub />} />
                    <Route path="/module/:moduleId" element={<ModuleDetails />} /> {/* Added dynamic route */}
                    <Route path="/education-hub/quick-assessment" element={<QuickAssessment />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/terms-of-use" element={<TermsOfUse />} />
                    <Route path="/faq" element={<FAQ />} />
                </Routes>

                <footer>
                    <div className="footer-logo">
                        <Link to="/">
                            <img src="logo.png" alt="CyberAegiz Logo" />
                        </Link>
                    </div>
                    <ul className="footer-links">
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/terms-of-use">Terms of Use</Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                    </ul>
                </footer>
            </div>
        </Router>
    );
}

export default App;
