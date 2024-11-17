import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuickAssessment.css';

const QuickAssessment = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/education-hub/assessment/questions');
                setQuestions(response.data);
                setAnswers(Array(response.data.length).fill(null)); // Initialize answers
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
        fetchQuestions();
    }, []);

    const handleAnswerChange = (questionIndex, answerIndex) => {
        const updatedAnswers = [...answers];
        updatedAnswers[questionIndex] = answerIndex;
        setAnswers(updatedAnswers);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5001/api/education-hub/assessment/submit', { answers });
            setResult(response.data);
        } catch (error) {
            console.error('Error submitting assessment:', error);
        }
        setLoading(false);
    };

    return (
        <div className="quick-assessment">
            <h2>Quick Assessment</h2>
            {result ? (
                <div className="result-section">
                    <h3>Your Score: {result.score}</h3>
                    <p>Based on your answers, we recommend the following modules:</p>
                    <ul>
                        {result.suggestions.map((module) => (
                            <li key={module._id}>{module.title}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    {questions.map((question, index) => (
                        <div key={index} className="question">
                            <h4>{question.question}</h4>
                            {question.options.map((option, optIndex) => (
                                <div key={optIndex}>
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        checked={answers[index] === optIndex}
                                        onChange={() => handleAnswerChange(index, optIndex)}
                                    />
                                    <label>{option}</label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuickAssessment;
