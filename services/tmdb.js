const TMDB_URL = "https://api.themoviedb.org/3";

const tmdbOptions = {
    headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
    }
};

const getPopularMedia = async (mediaType) => {
    if (mediaType !== "movie" && mediaType !== "tv") throw new Error("Invalid media type");

    const response = await fetch(`${TMDB_URL}/${mediaType}/popular`, tmdbOptions);

    if (!response.ok) throw new Error("Failed to fetch popular movies from TMDB");

    const data = await response.json();

    return data;
}

const getMediaDetails = async (mediaType, id) => {
    if (mediaType !== "movie" && mediaType !== "tv") throw new Error("Invalid media type");

    const response = await fetch(`${TMDB_URL}/${mediaType}/${id}`, tmdbOptions);

    if (!response.ok) throw new Error("Failed to fetch movie details");

    return response.json();
}

module.exports = {
    getPopularMedia,
    getMediaDetails,
}