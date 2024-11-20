// src/pages/EducationHub/QuizzesPage.js

import React, { useEffect, useState } from 'react';
import QuizCard from '../../components/QuizCard';
import { getQuizzes } from '../../api/quizzesApi';
import './EducationHub.css';

function QuizzesPage() {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const data = await getQuizzes();
                setQuizzes(data);
            } catch (err) {
                console.error("Failed to load quizzes:", err);
                setError("Failed to load quizzes.");
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    if (loading) return <p>Loading quizzes...</p>;
    if (error) return <p>{error}</p>;
    if (quizzes.length === 0) return <p>No quizzes found.</p>;

    return (
        <div className="education-hub">
            <h1>Education Hub - Quizzes</h1>
            <div className="quizzes-grid">
                {quizzes.map((quiz) => (
                    <QuizCard
                        key={quiz._id}
                        title={quiz.title}
                        description={quiz.description}
                        onClick={() => window.location.href = `/education-hub/quizzes/${quiz._id}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default QuizzesPage;
