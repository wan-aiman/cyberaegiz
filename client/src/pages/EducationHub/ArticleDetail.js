// src/pages/EducationHub/ArticleDetail.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EducationHub.css';
import axios from 'axios';

function ArticleDetail() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/articles/${id}`);
                setArticle(response.data);
            } catch (error) {
                console.error("Error fetching article:", error);
            }
        };

        fetchArticle();
    }, [id]);

    if (!article) return <p>Loading...</p>;

    return (
        <div className="article-detail">
            <h1>{article.title}</h1>
            <img src={article.image} alt={article.title} className="article-detail-image" />
            <p>{article.content}</p>
        </div>
    );
}

export default ArticleDetail;
