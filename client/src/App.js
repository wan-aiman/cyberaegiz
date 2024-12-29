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
                                <Link to="/" className="login-button">Login</Link>
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
                </Routes>

                <footer>
                    <div className="footer-logo">
                        <Link to="/">
                            <img src="logo.png" alt="CyberAegiz Logo" />
                        </Link>
                    </div>
                    <ul className="footer-links">
                        <li><Link to="/">About Us</Link></li>
                        <li><Link to="/">Privacy Policy</Link></li>
                        <li><Link to="/">Terms of Use</Link></li>
                        <li><Link to="/">Contact Us</Link></li>
                    </ul>
                </footer>
            </div>
        </Router>
    );
}

export default App;
