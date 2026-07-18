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
    watchlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Media"
        }
    ],
}, { timestamps: true, });

const User = mongoose.model("User", userSchema);

module.exports = User;
