const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true }, // User's name
    email: { type: String, required: true, unique: true }, // User's email
    image: { type: String }, // User's profile image (if provided by NextAuth)
    emailVerified: { type: Date }, // Verification status of email (handled by NextAuth)
    
    // Education Hub-specific fields
    completedQuizzes: [
        {
            quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
            score: { type: Number, required: true }, // User's score
            dateCompleted: { type: Date, default: Date.now },
            suggestedModules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Module' }] // Suggested modules based on quiz results
        }
    ],
    completedModules: [
        {
            moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' },
            dateCompleted: { type: Date, default: Date.now } // When the module was completed
        }
    ],
    progress: [
        {
            moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' },
            progressPercentage: { type: Number, default: 0 }, // User's progress in the module
            lastAccessed: { type: Date, default: Date.now } // Last time the user accessed the module
        }
    ],
    createdAt: { type: Date, default: Date.now }, // When the user was created
});

module.exports = mongoose.model('User', UserSchema);
