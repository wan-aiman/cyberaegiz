// src/pages/EducationHub/ArticlesPage.js

import React, { useEffect, useState } from 'react';
import ArticleCard from '../../components/ArticleCard';
import './ArticlesPage.css';
import axios from 'axios';

function ArticlesPage() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/articles'); // Replace with your API endpoint
                setArticles(response.data);
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };

        fetchArticles();
    }, []);

    return (
        <div className="articles-page">
            <h1>Education Hub</h1>
            <p>Empower your cyber safety with expert knowledge. Explore the CyberAegiz’s Education Hub today!</p>
            <div className="articles-grid">
                {articles.map((article) => (
                    <ArticleCard
                        key={article._id}
                        title={article.title}
                        summary={article.summary}
                        image={article.image}
                        onClick={() => window.location.href = `/education-hub/articles/${article._id}`} // Navigate to article detail page
                    />
                ))}
            </div>
        </div>
    );
}

export default ArticlesPage;
