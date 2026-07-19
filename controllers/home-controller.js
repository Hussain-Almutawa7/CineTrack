const tmdbService = require("../services/tmdb");

const home = async (req, res) => {
    const movieInfo = await tmdbService.getPopularMovies();
    try {

        res.render("home.ejs", {
            movies: movieInfo.results
        })
    } catch (error) {
        console.log("Fetch movie error: " + error.message);
    }
}

module.exports = {
    home,
}
