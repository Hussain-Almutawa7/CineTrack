const Rating = require("../models/rating");
const Media = require("../models/media");
const User = require("../models/user");

const saveRating = async (req, res) => {
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

    const existingRting = await Rating.findOne({
        media: media._id,
        user: req.session.user.id,
    });

    if (existingRting) {
        existingRting.rating = Number(req.body.rating);
        await existingRting.save();
    } else {
        await Rating.create({
            user: req.session.user.id,
            media: media._id,
            rating: Number(req.body.rating),
        });
    }

    res.redirect(`/${req.params.mediaType}/${req.params.mediaId}`)
}

const deleteRating = async (req, res) => {
    await Rating.findByIdAndDelete({
        _id: req.params.ratingId,
        user: req.session.user.id
    });

    res.redirect(`/${req.params.mediaType}/${req.params.mediaId}`)
}

module.exports = {
    saveRating,
    deleteRating,
}