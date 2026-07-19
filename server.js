const dns = require("node:dns");

// DNS workaround for MongoDB Atlas.
// Remove these two lines if your regular DNS works correctly.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const methodOverride = require("method-override");
const { MongoStore } = require("connect-mongo");
const session = require("express-session");
const upload = require("./config/multer");
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const path = require("path");

// Custom MiddleWare
const passUserToView = require("./middleware/pass-user-to-view.js");
const isSignedIn = require("./middleware/is-signed-in.js");

// Controllers
const authCtrl = require("./controllers/auth.js");
const homeCtrl = require("./controllers/home-controller.js");
const movieCtrl = require("./controllers/movie-controller.js")

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
        }),
    })
);

app.use(passUserToView);

// AUTH ROUTES
app.get("/auth/sign-up", authCtrl.showSignUpForm);
app.post("/auth/sign-up", authCtrl.signUp);
app.get("/auth/sign-in", authCtrl.showSignInForm);
app.post("/auth/sign-in", authCtrl.signIn);
app.delete("/auth/sign-out", authCtrl.signOut);

app.get("/dashboard", isSignedIn, authCtrl.dashboard);

// HOME ROUTES
app.get("/", homeCtrl.home)

// MOVIE ROUTES
app.get("/movies/:movieId", movieCtrl.movieDetails);

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log(`Connected to MongoDB: ${mongoose.connection.name}`);

        app.listen(PORT, () => {
            console.log(`Listening on ${PORT}`);
        });
    } catch (error) {
        console.log("MongoDB connection error:", error.message);
    }
};

startServer();
