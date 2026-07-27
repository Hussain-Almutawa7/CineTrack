const User = require("../models/user");
const Review = require("../models/review");
const Rating = require("../models/rating");

const showUserProfile = async (req, res) => {
    const userId = req.params.userId;
    const profileUser = await User.findById(userId);

    res.render("profile-page.ejs", { profileUser });
}

module.exports = {
    showUserProfile,
}