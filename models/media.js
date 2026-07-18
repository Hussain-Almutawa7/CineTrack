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
}, {timestamps: true})


const Media = mongoose.model("Media", mediaSchema);