const User = require("../models/user");
const bcrypt = require("bcrypt");

const showSignUpForm = (req, res) => {
    res.render("auth/sign-up.ejs");
};

const signUp = async (req, res) => {
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
        return res.send("Username or email is already taken");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const userData = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    };

    const user = await User.create(userData);

    req.session.user = {
        username: user.username,
        id: user._id, // Maybe I will add .toString() if I didn't like the comparsion with .equals()
        role: user.role,
    };

    req.session.save(() => {
        res.redirect("/");
    });
};

const showSignInForm = (req, res) => {
    res.render("auth/sign-in.ejs");
};

const signIn = async (req, res) => {
    const identifier = req.body.identifier.trim(); // To make the code concise and cleaner instead of me repeating

    const userInDatabase = await User.findOne({
        $or: [
            {
                username: identifier,
            },
            {
                email: identifier.toLowerCase(),
            },
        ]
    });

    if (!userInDatabase) {
        return res.send("Invalid username/email or password"); // I will change it later to a designed error page
    }

    const validPassword = await bcrypt.compare(
        req.body.password,
        userInDatabase.password
    );

    if (!validPassword) {
        return res.send("Invalid username/email or password"); // I will change it later to a designed error page
    }

    req.session.user = {
        username: userInDatabase.username,
        id: userInDatabase._id,
        role: userInDatabase.role,
    };

    req.session.save(() => {
        res.redirect("/");
    });
};

const signOut = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
};

const dashboard = (req, res) => {
    res.render("dashboard.ejs");
};

module.exports = {
    showSignUpForm,
    signUp,
    showSignInForm,
    signIn,
    signOut,
    dashboard,
};
