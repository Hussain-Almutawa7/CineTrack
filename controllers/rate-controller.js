const Rating = require("../models/rating");
const Media = require("../models/media");
const User = require("../models/user");

const saveRating = mediaType => {
    return async (req, res) => {
        let media = await Media.findOne({
            tmdbId: Number(req.params.mediaId),
            mediaType: mediaType,
        });

        if (!media) {
            media = await Media.create({
                tmdbId: Number(req.params.mediaId),
                mediaType: mediaType
            });
        }

        await Rating.create({
            user: req.session.user.id,
            media: media._id,
            rating: 10
        });

        res.redirect(`/movies/${req.params.mediaId}`)
    }
}

const deleteRating = async (req, res) => {

}

module.exports = {
    saveRating,
    deleteRating,
}