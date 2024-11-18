const mongoose = require('mongoose');

const BadgeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // Title is required
    },
    description: {
        type: String,
        required: true, // Description is required
    },
    icon: {
        type: String, // Optional field for badge icon file name or URL
        required: false,
    },
    awardedAt: {
        type: Date,
        default: Date.now, // Automatically assign the date the badge was created or awarded
    },
});

module.exports = mongoose.model('Badge', BadgeSchema);
