const Media = require("../models/media");
const User = require("../models/user");
const tmdbService = require("../services/tmdb");

const showWatchlist = async (req, res) => {
    const user = await User.findById(req.session.user.id).populate("watchlist");

    const watchlistDetails = await Promise.all(
        user.watchlist.map(async media => {
            const details = await tmdbService.getMediaDetails(media.mediaType, media.tmdbId)

            return {
                id: details.id,
                mediaType: media.mediaType,
                title: media.mediaType === "movie" ? details.title : details.name,
                posterPath: details.poster_path
            };
        })
    );

    res.render("watchlist.ejs", {
        watchlist: watchlistDetails,
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
    const user = await User.findById(req.session.user.id);

    let media = await Media.findOne({
        tmdbId: Number(req.params.mediaId),
        mediaType: req.params.mediaType,
    });

    user.watchlist.pull(media._id);
    await user.save();

    res.redirect(`/${req.params.mediaType}/${req.params.mediaId}`)
}

module.exports = {
    showWatchlist,
    addToWatchlist,
    removeFromWatchList,
}