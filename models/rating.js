const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    
}, { timestamps: true });

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;