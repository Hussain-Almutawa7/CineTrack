const tmdbService = require("../services/tmdb");

const home = async (req, res) => {
    try {
        const movieInfo = await tmdbService.getPopularMedia("movie");
        const tvInfo = await tmdbService.getPopularMedia("tv");

        res.render("home.ejs", {
            movies: movieInfo.results,
            tvs: tvInfo.results
        })
    } catch (error) {
        console.log("Fetch movie error: " + error.message);
    }
}

module.exports = {
    home,
}
