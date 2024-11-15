// src/components/QuizCard.js

import React from 'react';
import './QuizCard.css';

function QuizCard({ title, description, onClick }) {
    return (
        <div className="quiz-card" onClick={onClick}>
            <div className="quiz-content">
                <h3 className="quiz-title">{title}</h3>
                <p className="quiz-description">{description}</p>
                <button className="quiz-button">Take Quiz</button>
            </div>
        </div>
    );
}

export default QuizCard;
