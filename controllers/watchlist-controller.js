const Media = require("../models/media");
const User = require("../models/user");

const showWatchlist = async (req, res) => {
    const user = await User.findById(req.session.user.id).populate("watchlist");

    res.render("watchlist.ejs", {
        watchlist: user.watchlist
    });
}

const addToWatchlist = async (req, res) => {
    const user = await User.findById(req.session.user.id);

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

    const exisitingMedia = user.watchlist.some(mediaId => mediaId.equals(media._id));

    if (!exisitingMedia) {
        user.watchlist.push(media._id);
        await user.save();
    }

    res.redirect(`/${req.params.mediaType}/${req.params.mediaId}`)
}

const removeFromWatchList = async (req, res) => {

}

module.exports = {
    showWatchlist,
    addToWatchlist,
    removeFromWatchList,
}