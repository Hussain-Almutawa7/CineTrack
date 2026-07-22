const tmdbService = require("../services/tmdb");
const Media = require("../models/media");
const Review = require("../models/review");
const Rating = require("../models/rating");
const User = require("../models/user");

const mediaDetails = async (req, res) => {
    try {
        const tmdbMedia = await tmdbService.getMediaDetails(req.params.mediaType, req.params.mediaId);

        const media = await Media.findOne({
            tmdbId: Number(req.params.mediaId),
            mediaType: req.params.mediaType,
        });

        const currentUser = await User.findById(req.session.user.id)

        let reviews = [];

        let ratings = [];
        let avgRating = 0;
        let userRating = null;
        
        let isInWatchlist = false;

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

                isInWatchlist = await currentUser.watchlist.some(mediaId => mediaId.equals(media._id));
            }

            if (ratings.length > 0) {
                let totalRating = 0;

                ratings.forEach(rate => {
                    totalRating += rate.rating;
                });

                avgRating = (totalRating / ratings.length).toFixed(1);
            }


        }

        const mediaType = {
            id: tmdbMedia.id,
            title: req.params.mediaType === "movie" ? tmdbMedia.title : tmdbMedia.name,
            releaseDate: req.params.mediaType === "movie" ? tmdbMedia.release_date : tmdbMedia.first_air_date,
            runtime: req.params.mediaType === "movie" ? tmdbMedia.runtime : tmdbMedia.episode_run_time[0],
            posterPath: tmdbMedia.poster_path,
            overview: tmdbMedia.overview,
            backdropPath: tmdbMedia.backdrop_path,
            tagline: tmdbMedia.tagline,
            genres: tmdbMedia.genres,
        }

        res.render("media/movie-details.ejs", {
            tmdbMedia: mediaType,
            reviews,
            avgRating,
            userRating,
            rating: ratings.length,
            mediaType: req.params.mediaType,
            mediaId: req.params.mediaId,
            isInWatchlist,
        });

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    mediaDetails,
}