// src/pages/EducationHub/ArticlesPage.js

import React, { useEffect, useState } from 'react';
import ArticleCard from '../../components/ArticleCard';
import { getArticles } from '../../api/articlesApi';
import './EducationHub.css';

function ArticlesPage() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const data = await getArticles();
                setArticles(data);
            } catch (err) {
                console.error("Failed to load articles:", err);
                setError("Failed to load articles.");
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) return <p>Loading articles...</p>;
    if (error) return <p>{error}</p>;
    if (articles.length === 0) return <p>No articles found.</p>;

    return (
        <div className="education-hub">
            <h1>Education Hub - Articles</h1>
            <div className="articles-grid">
                {articles.map((article) => (
                    <ArticleCard
                        key={article._id}
                        title={article.title}
                        summary={article.summary}
                        image={article.image || "https://via.placeholder.com/300x180"}
                        onClick={() => window.location.href = `/education-hub/articles/${article._id}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default ArticlesPage;
