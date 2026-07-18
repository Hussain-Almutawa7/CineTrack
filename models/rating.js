const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
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
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
    }
}, { timestamps: true });

ratingSchema.index(
    {
        user: 1,
        media: 1,
    },
    {
        unique: true,
    },
);

ratingSchema.index({
    media: 1,
});

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;