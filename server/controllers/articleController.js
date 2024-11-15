// controllers/articleController.js
const Article = require('../models/Article');

// Get all articles
exports.getArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve articles", error: error.message });
    }
};

// Get a single article by ID
exports.getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve article", error: error.message });
    }
};

// Create a new article
exports.createArticle = async (req, res) => {
    try {
        const { title, content, author, summary, date, tags } = req.body;
        const newArticle = new Article({
            title,
            content,
            author,
            summary,
            date,
            tags
        });
        const savedArticle = await newArticle.save();
        res.status(201).json(savedArticle);
    } catch (error) {
        res.status(500).json({ message: "Failed to create article", error: error.message });
    }
};

// Update an article by ID
exports.updateArticle = async (req, res) => {
    try {
        const updatedArticle = await Article.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedArticle) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.status(200).json(updatedArticle);
    } catch (error) {
        res.status(500).json({ message: "Failed to update article", error: error.message });
    }
};

// Delete an article by ID
exports.deleteArticle = async (req, res) => {
    try {
        const deletedArticle = await Article.findByIdAndDelete(req.params.id);
        if (!deletedArticle) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.status(200).json({ message: "Article deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete article", error: error.message });
    }
};
