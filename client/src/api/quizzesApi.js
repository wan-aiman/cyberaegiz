// src/api/quizzesApi.js

import axios from 'axios';

const API_URL = 'http://localhost:5001/api/quizzes'; // Adjust this URL if necessary

// Fetch all quizzes
export const getQuizzes = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching quizzes:", error);
        throw error;
    }
};

// Fetch a single quiz by ID
export const getQuizById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching quiz with ID ${id}:`, error);
        throw error;
    }
};

// Create a new quiz
export const createQuiz = async (quizData) => {
    try {
        const response = await axios.post(API_URL, quizData);
        return response.data;
    } catch (error) {
        console.error("Error creating quiz:", error);
        throw error;
    }
};

// Update an existing quiz by ID
export const updateQuiz = async (id, quizData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, quizData);
        return response.data;
    } catch (error) {
        console.error(`Error updating quiz with ID ${id}:`, error);
        throw error;
    }
};

// Delete a quiz by ID
export const deleteQuiz = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting quiz with ID ${id}:`, error);
        throw error;
    }
};
