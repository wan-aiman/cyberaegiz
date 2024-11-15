// src/api/articlesApi.js

import axios from 'axios';

const API_URL = 'http://localhost:5001/api/articles';

export const getArticles = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching articles:", error);
        throw error;
    }
};
