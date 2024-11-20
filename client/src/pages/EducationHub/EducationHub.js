// src/pages/EducationHub/EducationHub.js

import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ArticlesPage from './ArticlesPage';
import QuizzesPage from './QuizzesPage';
import './EducationHub.css';

function EducationHub() {
    return (
        <div className="education-hub-container">
            <h1>Education Hub</h1>
            <p>Empower your cyber safety with expert knowledge. Explore the CyberAegiz Education Hub today!</p>
            
            <div className="hub-nav">
                <Link to="/education-hub/articles" className="hub-link">Articles</Link>
                <Link to="/education-hub/quizzes" className="hub-link">Quizzes</Link>
            </div>

            <Routes>
                <Route path="articles" element={<ArticlesPage />} />
                <Route path="quizzes" element={<QuizzesPage />} />
            </Routes>
        </div>
    );
}

export default EducationHub;
