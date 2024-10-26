import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PhishingDetectionPage from './pages/PhishingDetectionPage';

const App = () => {
    return (
        <Router>
            <div className="app">
                <header>
                    <h1>CyberAegiz Security Platform</h1>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/phishing-detection">Phishing Detection</Link></li>
                        </ul>
                    </nav>
                </header>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/phishing-detection" element={<PhishingDetectionPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
