const tmdbService = require("../services/tmdb");

const home = async (req, res, next) => {
    try {
        const [movieInfo, tvInfo, trendingMovies,trendingTvs] = await Promise.all([
            tmdbService.getPopularMedia("movie"),
            tmdbService.getPopularMedia("tv"),
            tmdbService.getTrendingMedia("movie"),
            tmdbService.getTrendingMedia("tv"),
        ]);

        res.render("home.ejs", {
            movies: movieInfo.results,
            tvs: tvInfo.results,
            trendingMovies: trendingMovies.results,
            trendingTvs: trendingTvs.results,
        });
    } catch (error) {
        console.log("Homepage fetch error:", error.message);
        next(error);
    }
};

module.exports = {
    home,
};