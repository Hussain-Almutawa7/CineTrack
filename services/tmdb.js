const TMDB_URL = "https://api.themoviedb.org/3";

const tmdbOptions = {
    headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
    }
};

const getPopularMovies = async () => {
    const response = await fetch(`${TMDB_URL}/movie/popular`, tmdbOptions);

    if (!response.ok) throw new Error("Failed to fetch popular movies from TMDB");

    const data = await response.json();

    return data;
}

const getMovieDetails = async (id) => {
    const response = await fetch(`${TMDB_URL}/movie/${id}`, tmdbOptions);

    if (!response.ok) throw new Error("Failed to fetch movie details");

    return response.json();
}

module.exports = {
    getPopularMovies,
    getMovieDetails,
}