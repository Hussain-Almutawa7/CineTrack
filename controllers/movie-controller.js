const tmdbService = require("../services/tmdb");
const Media = require("../models/media");
const Review = require("../models/review");

const movieDetails = async (req, res) => {
    try {
        const movie = await tmdbService.getMovieDetails(req.params.movieId);

        const media = await Media.findOne({
            tmdbId: Number(req.params.movieId),
            mediaType: "movie",
        })

        let reviews = [];

        if (media) {
            reviews = await Review.find({
                media: media._id
            }).populate("user");
        }

        res.render("media/movie-details.ejs", { movie, reviews });

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    movieDetails,
}