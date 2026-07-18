const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "viewer"],
        default: "viewer"
    },
    watchlist: [{
        mediaId: {
            type: Number,
            required: true
        },
        mediaType: {
            type: String,
            enum: ["movie", "tv"],
            required: true
        }
    }],
}, { timestamps: true, });

const User = mongoose.model("User", userSchema);

module.exports = User;
