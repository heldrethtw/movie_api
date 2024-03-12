import mongoose from "mongoose";

const tokenBlacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
});

const tokenBlacklist = mongoose.model('tokenBlacklist', tokenBlacklistSchema);

export default tokenBlacklist;