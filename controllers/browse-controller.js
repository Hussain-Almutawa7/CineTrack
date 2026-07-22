const tmdbService = require("../services/tmdb");

const normalizeMedia = (item, mediaType) => {
    return {
        id: item.id,
        mediaType,
        title: mediaType === "movie" ? item.title : item.name,
        releaseDate: mediaType === "movie" ? item.release_date : item.first_air_date,
        posterPath: item.poster_path,
        rating: item.vote_average,
        popularity: item.popularity,
    };
};

const showBrowse = async (req, res) => {
    const searchTerm = req.query.search?.trim() || "";

    let page = Number(req.query.page) || 1;

    let mediaResults = [];
    let totalPages = 1;

    if (searchTerm) {
        const searchData = await tmdbService.searchMedia(searchTerm.page);

        mediaResults = searchData.results.filter(media => {
            return media.media_type === "movie" || media.media_type === "tv"
        }).map(media => {
            return normalizeMedia(media, media.media_type)
        });

        totalPages = searchData.total_pages;
    } else {
        const results = await Promise.all([
            tmdbService.discoverMedia("movie", page),
            tmdbService.discoverMedia("tv", page)
        ]);

        const moviData = results[0];
        const tvData = results[0];

        const movies = moviData.results.map(movie => {
            return normalizeMedia(movie, "movie");
        });

        const tvShows = tvData.results.map(tv => {
            return normalizeMedia(tv, "tv");
        });

        mediaResults = [...movies, ...tvShows];

        mediaResults.sort((firstMedia, secondMedia) => {
            return secondMedia.popularity - firstMedia.popularity;
        });

        totalPages = Math.min(moviData.totalPages, tvData.totalPages);
    }

    res.render("browse.ejs", {
        mediaResults,
        searchTerm,
        encodedSearch: encodeURIComponent(searchTerm),
        page,
        totalPages,
    })
}

module.exports = {
    showBrowse,
}