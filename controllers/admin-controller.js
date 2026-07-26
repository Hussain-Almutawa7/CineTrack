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
    const password = req.body.password;

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
            returnLink: "/admin/users",
            returnText: "Return to Manage Users",
        });
    }

    if (!password || password.trim().length < 8) {
        return res.status(400).render("error.ejs", {
            statusCode: 400,
            title: "Invalid Password",
            message: "The password must contain at least 8 characters.",
            returnLink: "/admin/users",
            returnText: "Return to Manage Users",
        });

    }

    const hashedPassword = await bcrypt.hash(password, 10);

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
    const password = req.body.password;
    const userId = req.params.userId;

    const userInDatabase = await User.findOne({
        _id: { $ne: userId },
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
            returnLink: "/admin/users",
            returnText: "Return to Manage Users",
        });
    }

    const isEditingSelfRole = userId === req.session.user.id;
    const editAdmin = await User.findById(userId);

    if (isEditingSelfRole && req.body.role !== editAdmin.role) {
        return res.status(400).render("error.ejs", {
            statusCode: 400,
            title: "Role Cannot Be Changed",
            message: "You cannot change your own admin role.",
            returnLink: "/admin/users",
            returnText: "Return to Manage Users",
        });
    }

    const userData = {
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
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

    res.redirect("/admin/users");
}

const deleteUser = async (req, res) => {
    const userId = req.params.userId;

    if (userId === req.session.user.id) {
        return res.status(400).render("error.ejs", {
            statusCode: 400,
            title: "Cannot Delete Account",
            message: "You cannot delete your own admin account.",
            returnLink: "/admin/users",
            returnText: "Return to Manage Users",
        });
    }

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