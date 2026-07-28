const tmdbService = require("../services/tmdb");
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

    if (!isOwnerProfile && req.session.user.role !== "admin") {
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



    const recentReviews = await Promise.all(
        reviews.slice(0, 3).map(async review => {
            const details = await tmdbService.getMediaDetails(review.media.mediaType, review.media.tmdbId);

            return {
                ...review.toObject(),
                title: review.media.mediaType === "movie" ? details.title : details.name,
            };
        })
    );

    let ratings = await Rating.find({
        user: userId
    }).populate("media").sort({ createdAt: -1 });

    const recentRatings = await Promise.all(
        ratings.slice(0, 3).map(async rating => {
            const details = await tmdbService.getMediaDetails(rating.media.mediaType, rating.media.tmdbId);

            return {
                ...rating.toObject(),
                title: rating.media.mediaType === "movie" ? details.title : details.name,
            }
        })
    );

    if (ratings.length > 0) {
        let totalRating = 0;

        ratings.forEach(rate => {
            totalRating += rate.rating;
        });

        avgRating = (totalRating / ratings.length).toFixed(1);
    }


    res.render("profile-page.ejs", {
        watchlistCount: profileUser.watchlist?.length || 0,
        recentReviews,
        recentRatings,
        reviewCount: reviews.length,
        ratingCount: ratings.length,
        isAdminViewing,
        isOwnerProfile,
        profileUser,
        avgRating,
    });
}

const editUserProfile = async (req, res) => {
    const userId = req.params.userId;
    const password = req.body.password;

    const userData = {
        username: req.body.username,
        email: req.body.email,
    }

    if (password && password.trim()) {
        if (password.trim().length < 8) {
            return res.status(400).render("error.ejs", {
                statusCode: 400,
                title: "Invalid Password",
                message: "The new password must contain at least 8 characters.",
                returnLink: "/admin/users",
                returnText: "Return to Manage Users",
            });
        }

        userData.password = await bcrypt.hash(password, 10);
    }

    await User.findByIdAndUpdate(userId, userData, {
        runValidators: true,
    });

    res.redirect(`/user/${userId}`);
}

const deleteUserProfile = async (req, res) => {
    const userId = req.params.userId;

    await Review.deleteMany({ user: userId });
    await Rating.deleteMany({ user: userId });
    await User.findByIdAndDelete(userId);

    req.session.destroy(() => {
        res.redirect("/");
    });
}

module.exports = {
    showUserProfile,
    editUserProfile,
    deleteUserProfile,
}