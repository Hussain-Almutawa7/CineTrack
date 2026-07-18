const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
    tmdbId: {
        type: Number,
        required: true,
    },
    mediaType: {
        type: String,
        enum: ["movie", "tv"],
        required: true,
    }
}, { timestamps: true })

mediaSchema.index(
    {
        tmdbId: 1,
        mediaType: 1,
    },
    {
        unique: true,
    },
);

const Media = mongoose.model("Media", mediaSchema);

module.exports = Media;