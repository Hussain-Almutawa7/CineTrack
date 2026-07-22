const dns = require("node:dns");
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
const movieCtrl = require("./controllers/movie-controller.js");
const reviewCtrl = require("./controllers/review-controller.js");
const rateCtrl = require("./controllers/rate-controller.js");
const watchlistCtrl = require("./controllers/watchlist-controller.js");
const browseCtrl = require("./controllers/browse-controller.js");

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

// HOME ROUTE
app.get("/", homeCtrl.home)

// MOVIE DETAILS ROUTE
app.get("/:mediaType/:mediaId", movieCtrl.mediaDetails);

// REVIEW ROUTES
app.post("/:mediaType/:mediaId/reviews", isSignedIn, reviewCtrl.createReview);
app.delete("/:mediaType/:mediaId/reviews/:reviewId", isSignedIn, reviewCtrl.deleteReview);
app.put("/:mediaType/:mediaId/reviews/:reviewId", isSignedIn, reviewCtrl.editReview);

// RATING ROUTES
app.post("/:mediaType/:mediaId/rating", isSignedIn, rateCtrl.saveRating);
app.delete("/:mediaType/:mediaId/rating/:ratingId", isSignedIn, rateCtrl.deleteRating);

// WATCHLIST ROUTES
app.get("/watchlist", isSignedIn, watchlistCtrl.showWatchlist);
app.post("/watchlist/:mediaType/:mediaId", isSignedIn, watchlistCtrl.addToWatchlist);
app.delete("/watchlist/:mediaType/:mediaId", isSignedIn, watchlistCtrl.removeFromWatchList);

// BROWSE ROUTE
app.get("/browse", browseCtrl.showBrowse)

// HANDLE ERROR ROUTE
app.get("/*splat", (req, res) => {
    res.status(404).render("error.ejs", {
        statusCode: 404,
        title: "Page Not Found",
        message: "The page you are looking for does not exist.",
        returnLink: "/",
        returnText: "Return Home",
    });
});

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
