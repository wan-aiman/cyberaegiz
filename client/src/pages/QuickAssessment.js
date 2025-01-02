import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './QuickAssessment.css';

const QuickAssessment = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [feedback, setFeedback] = useState([]);
    const [result, setResult] = useState(null);
    const [moduleSuggestions, setModuleSuggestions] = useState([]);
    const [allModules, setAllModules] = useState([]); // Store all modules
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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

        const fetchAllModules = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/education-hub/modules');
                setAllModules(response.data);
            } catch (error) {
                console.error('Error fetching modules:', error);
            }
        };

        fetchQuestions();
        fetchAllModules();
    }, []);

    const handleAnswerChange = (questionIndex, answerIndex) => {
        const updatedAnswers = [...answers];
        updatedAnswers[questionIndex] = answerIndex;
        setAnswers(updatedAnswers);
    };

    const handleSubmit = () => {
        setLoading(true);
        const feedbackArray = questions.map((question, index) => {
            const isCorrect = question.correctAnswer === answers[index];
            return isCorrect
                ? { message: 'Correct! Great job!', isCorrect: true, category: question.category }
                : {
                      message: `Wrong. The correct answer is: ${question.options[question.correctAnswer]}`,
                      isCorrect: false,
                      category: question.category,
                  };
        });

        setFeedback(feedbackArray);

        // Filter suggested modules based on wrong answers
        const wrongCategories = feedbackArray
            .filter((item) => !item.isCorrect)
            .map((item) => item.category);

        if (wrongCategories.length > 0) {
            const suggestedModules = allModules.filter((module) =>
                wrongCategories.includes(module.category)
            );
            setModuleSuggestions(suggestedModules);
        } else {
            // If all answers are correct, suggest random modules
            const randomSuggestions = allModules.slice(0, 5);
            setModuleSuggestions(randomSuggestions);
        }

        // Calculate the score
        const correctCount = feedbackArray.filter((item) => item.isCorrect).length;
        const score = `${correctCount} / ${questions.length}`;
        setResult({ score });
        setLoading(false);
    };

    const handleModuleClick = (moduleId) => {
        navigate(`/module/${moduleId}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="quick-assessment">
            <h2>Quick Assessment</h2>
            <form>
                {questions.map((question, index) => (
                    <div key={index} className="question">
                        <h4>{question.question}</h4>
                        {question.options.map((option, optIndex) => (
                            <label key={optIndex}>
                                <input
                                    type="radio"
                                    name={`question-${index}`}
                                    checked={answers[index] === optIndex}
                                    onChange={() => handleAnswerChange(index, optIndex)}
                                />
                                {option}
                            </label>
                        ))}
                        {feedback.length > 0 && feedback[index] && (
                            <p
                                className={`feedback ${
                                    feedback[index].isCorrect ? 'correct' : 'wrong'
                                }`}
                            >
                                {feedback[index].message}
                            </p>
                        )}
                    </div>
                ))}
                <button
                    className="submit-btn"
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading || answers.includes(null)}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
            {result && (
                <div className="result-section">
                    <h3>Your Score: {result.score}</h3>
                    <p>
                        {moduleSuggestions.length > 0
                            ? 'Based on your performance, here are some suggested modules for you:'
                            : 'Great job! Here are some additional modules you might enjoy:'}
                    </p>
                    <div className="module-suggestions">
                        <div className="module-carousel">
                            {moduleSuggestions.map((module) => (
                                <div
                                    className="module-card"
                                    key={module._id}
                                    onClick={() => handleModuleClick(module._id)}
                                >
                                    <img src={module.image} alt={module.title} />
                                    <h4>{module.title}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuickAssessment;
