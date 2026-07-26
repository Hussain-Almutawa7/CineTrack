const Review = require("../models/review");
const Rating = require("../models/rating");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const showUsers = async (req, res) => {
    const users = await User.find();

    res.render("admin/manage-users.ejs", { users });
}

const showUser = async (req, res) => {

}

const addUser = async (req, res) => {
    const userInDatabase = await User.findOne({
        $or: [
            {
                username: req.body.username.trim(),
            },
            {
                email: req.body.email.trim().toLowerCase(),
            },
        ]
    });

    if (userInDatabase) {
        return res.status(409).render("error.ejs", {
            statusCode: 409,
            title: "Account Already Exists",
            message: "The username or email you entered is already being used.",
            returnLink: "/auth/sign-up",
            returnText: "Return to Sign Up",
        });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const userData = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role
    }

    await User.create(userData);

    res.redirect("/admin/users");
}

const editUser = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userId = req.params.userId;

    const userData = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role
    }

    await User.findByIdAndUpdate(userId, userData);
    res.redirect("/admin/users");


}

const deleteUser = async (req, res) => {
    const userId = req.params.userId;

    await Review.deleteMany({ user: userId });
    await Rating.deleteMany({ user: userId })
    await User.findByIdAndDelete(userId);

    res.redirect("/admin/users");
}

module.exports = {
    showUsers,
    showUser,
    addUser,
    editUser,
    deleteUser,
}