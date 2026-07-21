const Media = require("../models/media");
const Review = require("../models/review");

const createReview = mediaType => {
    return async (req, res) => {
        let media = await Media.findOne({
            tmdbId: Number(req.params.mediaId),
            mediaType: "movie",
        });

        if (!media) {
            media = await Media.create({
                tmdbId: Number(req.params.mediaId),
                mediaType: "movie"
            });
        }

        await Review.create({
            user: req.session.user.id,
            media: media._id,
            comment: req.body.comment,
        });

        res.redirect(`/movies/${req.params.mediaId}`)
    }
}

const deleteReview = async (req, res) => {
    await Review.findByIdAndDelete({
        _id: req.params.reviewId,
        user: req.session.user.id,
    }); // I changed since it is safer to protect the server since ejs protect only what the user can see

    res.redirect(`/movies/${req.params.mediaId}`)
}

const editReview = async (req, res) => {
    await Review.findByIdAndUpdate(
        {
            _id: req.params.reviewId,
            user: req.session.user.id
        },
        {
            comment: req.body.comment
        }
    );

    res.redirect(`/movies/${req.params.mediaId}`)
}

module.exports = {
    createReview,
    deleteReview,
    editReview,
}