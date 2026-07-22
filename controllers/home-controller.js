const tmdbService = require("../services/tmdb");

const home = async (req, res) => {
    try {
        const movieInfo = await tmdbService.getPopularMedia("movie");
        const tvInfo = await tmdbService.getPopularMedia("tv");

        const trendingMovies = await tmdbService.getTrendingMedia("movie");
        const trendingTvs = await tmdbService.getTrendingMedia("tv");

        res.render("home.ejs", {
            movies: movieInfo.results,
            tvs: tvInfo.results,
            trendingTvs: trendingTvs.results,
            trendingMovies: trendingMovies.results,
        })
    } catch (error) {
        console.log("Fetch movie error: " + error.message);
    }
}

module.exports = {
    home,
}
