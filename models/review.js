const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    media: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media",
        required: true,
    },
    comment: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true });

reviewSchema.index(
    {
        user: 1,
        media: 1,
    },
    {
        unique: true,
    },
);

reviewSchema.index({
    media: 1,
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;