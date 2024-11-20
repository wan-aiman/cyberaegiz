// src/pages/EducationHub/QuizDetail.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EducationHub.css';
import axios from 'axios';

function QuizDetail() {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/quizzes/${id}`);
                setQuiz(response.data);
            } catch (error) {
                console.error("Error fetching quiz:", error);
            }
        };

        fetchQuiz();
    }, [id]);

    const handleAnswerChange = (questionId, answer) => {
        setAnswers({ ...answers, [questionId]: answer });
    };

    const handleSubmit = () => {
        console.log("Submitted answers:", answers);
        // Add submission logic here
    };

    if (!quiz) return <p>Loading...</p>;

    return (
        <div className="quiz-detail">
            <h1>{quiz.title}</h1>
            {quiz.questions.map((question, index) => (
                <div key={question._id} className="question">
                    <p>{index + 1}. {question.text}</p>
                    <div className="options">
                        {question.options.map((option, i) => (
                            <label key={i}>
                                <input
                                    type="radio"
                                    name={question._id}
                                    value={option}
                                    onChange={() => handleAnswerChange(question._id, option)}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                </div>
            ))}
            <button onClick={handleSubmit} className="submit-button">Submit</button>
        </div>
    );
}

export default QuizDetail;
