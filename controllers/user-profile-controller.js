const User = require("../models/user");
const Review = require("../models/review");
const Rating = require("../models/rating");

const showUserProfile = async (req, res) => {
    const userId = req.params.userId;
    const profileUser = await User.findById(userId);

    if (!profileUser) {
        return res.status(404).render("error.ejs", {
            statusCode: 404,
            title: "User Not Found",
            message: "The requested user account could not be found.",
            returnLink: "/",
            returnText: "Return Home",
        });
    }

    const isOwnerProfile = userId === req.session.user.id;
    const isAdminViewing = req.session.user.role === "admin" && !isOwnerProfile;

    if (!isOwnProfile && req.session.user.role !== "admin") {
        return res.status(403).render("error.ejs", {
            statusCode: 403,
            title: "Access Denied",
            message: "You are not allowed to view this profile.",
            returnLink: "/",
            returnText: "Return Home",
        });
    }

    let avgRating = null;

    let reviews = await Review.find({
        user: userId
    }).populate("media").sort({ createdAt: -1 });

    let ratings = await Rating.find({
        user: userId
    }).populate("media").sort({ createdAt: -1 });

    if (ratings.length > 0) {
        let totalRating = 0;

        ratings.forEach(rate => {
            totalRating += rate.rating;
        });

        avgRating = (totalRating / ratings.length).toFixed(1);
    }


    res.render("profile-page.ejs", {
        watchlistCount: profileUser.watchlist?.length || 0,
        recentReveiws: reviews.slice(0, 3),
        recentRating: ratings.slice(0, 3),
        reviewCount: reviews.length,
        ratingCount: ratings.length,
        isAdminViewing,
        isOwnerProfile,
        profileUser,
        avgRating,
    });
}

module.exports = {
    showUserProfile,
}