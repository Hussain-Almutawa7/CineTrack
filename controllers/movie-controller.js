const tmdbService = require("../services/tmdb");

const movieDetails = async (req, res) => {
    const movie = tmdbService.getMovieDetails(req.params.movieId);

    res.render("media/movie-details.ejs", { movie })
}

module.exports = {
    movieDetails,
}