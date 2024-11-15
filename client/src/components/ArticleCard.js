// src/components/ArticleCard.js

import React from 'react';
import './ArticleCard.css';

function ArticleCard({ title, summary, image, onClick }) {
    return (
        <div className="article-card" onClick={onClick}>
            <div className="article-image" style={{ backgroundImage: `url(${image})` }} />
            <div className="article-content">
                <h3 className="article-title">{title}</h3>
                <p className="article-summary">{summary}</p>
            </div>
        </div>
    );
}

export default ArticleCard;
