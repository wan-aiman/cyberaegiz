const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    action: { type: String, required: true }, // e.g., "completed_quiz", "viewed_module", "started_quiz"
    targetId: { type: mongoose.Schema.Types.ObjectId }, // Associated quizId or moduleId
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ActivityLog', ActivityLogSchema);
