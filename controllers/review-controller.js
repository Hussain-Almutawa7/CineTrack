const Media = require("../models/media");
const Review = require("../models/review");

const createReview = async (req, res) => {
    let media = await Media.findOne({
        tmdbId: Number(req.params.mediaId),
        mediaType: req.params.mediaType,
    });

    if (!media) {
        media = await Media.create({
            tmdbId: Number(req.params.mediaId),
            mediaType: req.params.mediaType,
        });
    }

    await Review.create({
        user: req.session.user.id,
        media: media._id,
        comment: req.body.comment,
    });

    res.redirect(`/${req.params.mediaType}/${req.params.mediaId}`)
}

const deleteReview = async (req, res) => {
    await Review.findOneAndDelete({
        _id: req.params.reviewId,
        user: req.session.user.id,
    });

    res.redirect(`/${req.params.mediaType}/${req.params.mediaId}`)
}

const editReview = async (req, res) => {
    await Review.findOneAndUpdate(
        {
            _id: req.params.reviewId,
            user: req.session.user.id
        },
        {
            comment: req.body.comment
        }
    );

    res.redirect(`/${req.params.mediaType}/${req.params.mediaId}`)
}

module.exports = {
    createReview,
    deleteReview,
    editReview,
}