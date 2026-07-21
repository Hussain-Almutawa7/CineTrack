const Rating = require("../models/rating");
const Media = require("../models/media");
const User = require("../models/user");

const saveRating = async (req, res) => {
    let media = await Media.findOne({
        tmdbId: Number(req.params.movieId),
        mediaType: "movie",
    });

    if (!media) {
        media = await Media.create({
            tmdbId: Number(req.params.movieId),
            mediaType: "movie"
        });
    }

    await Rating.create({
        user: req.session.user.id,
        media: media._id,
        rating: 10
    });

    res.redirect(`/movies/${req.params.movieId}`)
}

const deleteRating = async (req, res) => {

}

module.exports = {
    saveRating,
    deleteRating,
}