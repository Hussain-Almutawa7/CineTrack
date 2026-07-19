const tmdbService = require("../services/tmdb");

const movieDetails = async (req, res) => {
    try {
        const movie = await tmdbService.getMovieDetails(req.params.movieId);

        res.render("media/movie-details.ejs", { movie });

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    movieDetails,
}