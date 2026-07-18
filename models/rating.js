const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    mediaId: {
        type: Number,
        required: true,
    },
    mediaType: {
        type: String,
        enum: ["movie", "tv"],
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
    }
}, { timestamps: true });

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;