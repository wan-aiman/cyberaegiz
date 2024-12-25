const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true }, // Setting key (e.g., "maxQuizAttempts")
    value: { type: mongoose.Schema.Types.Mixed, required: true }, // Value (could be string, number, boolean, or object)
    description: { type: String }, // Optional description of the setting
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Settings', SettingsSchema);
