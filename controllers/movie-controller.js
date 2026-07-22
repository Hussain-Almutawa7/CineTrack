const tmdbService = require("../services/tmdb");
const Media = require("../models/media");
const Review = require("../models/review");
const Rating = require("../models/rating");

const mediaDetails = async (req, res) => {
    try {
        const movie = await tmdbService.getMediaDetails(req.params.mediaId);

        const media = await Media.findOne({
            tmdbId: Number(req.params.mediaId),
            mediaType: req.params.mediaType,
        })

        let reviews = [];

        let ratings = [];
        let avgRating = 0;
        let userRating = null;

        if (media) {
            reviews = await Review.find({
                media: media._id
            }).populate("user");

            ratings = await Rating.find({
                media: media._id
            });

            if (req.session.user) {
                userRating = await Rating.findOne({
                    media: media._id,
                    user: req.session.user.id,
                });
            }

            if (ratings.length > 0) {
                let totalRating = 0;

                ratings.forEach(rate => {
                    totalRating += rate.rating;
                });

                avgRating = (totalRating / ratings.length).toFixed(1);
            }
        }

        res.render("media/movie-details.ejs", {
            movie,
            reviews,
            avgRating,
            userRating,
            rating: ratings.length,
            mediaType: req.params.mediaType,
        });

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    mediaDetails,
}