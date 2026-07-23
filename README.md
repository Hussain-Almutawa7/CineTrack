# CineTrack

_A full-stack movie and TV tracking application where users can discover media, create reviews, submit ratings, and manage a personal watchlist._

<img width="2315" height="1361" alt="image" src="https://github.com/user-attachments/assets/b6a97d6f-f531-4d42-bbd3-6db0e601b3aa" />

## Getting Started

### Deployed Application

[CineTrack Live Website](https://cinetrack-wd3p.onrender.com/)

### GitHub Repository

[CineTrack Repository](https://github.com/Hussain-Almutawa7/CineTrack)

## Features

### Guest Users

- View popular movies and TV shows.
- View trending movies and TV shows.
- Browse movies and TV shows.
- Search for media by title.
- Navigate through search results using pagination.
- View media details.
- Read ratings and reviews submitted by users.

### Signed-In Users

- Create an account.
- Sign in using a username or email.
- Sign out securely.
- Add movies and TV shows to a personal watchlist.
- Remove media from the watchlist.
- View all saved watchlist items.
- Rate movies and TV shows.
- Update an existing rating.
- Delete a rating.
- Create reviews.
- Edit personal reviews.
- Delete personal reviews.

## How to Use

1. Open the CineTrack application.
2. Explore popular and trending movies and TV shows on the home page.
3. Open the Browse page to view more media.
4. Use the search form to search for a movie or TV show.
5. Select a media card to open its details page.
6. Create an account or sign in.
7. Add media to your watchlist.
8. Submit ratings and reviews.
9. Edit or delete your own ratings and reviews.

## Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_LINK_HERE
cd CineTrack
```

Install the dependencies:

```bash
npm install
```

Create a `.env` file in the main project folder:

```env
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
TMDB_ACCESS_TOKEN=your_tmdb_access_token
```

Start the development server:

```bash
nodemon
```

Open the application in your browser:

```text
http://localhost:3000
```

## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Express
- EJS
- MongoDB
- Mongoose
- TMDB API
- bcrypt
- express-session
- connect-mongo
- method-override
- Morgan
- dotenv

## Application Structure

CineTrack uses the TMDB API to retrieve media information such as:

- Titles
- Posters
- Backdrops
- Overviews
- Genres
- Release dates
- Runtime
- Popularity
- Trending media

MongoDB stores information created inside CineTrack, including:

- Users
- Reviews
- Ratings
- Watchlists
- Local media references

The local `Media` model connects TMDB media with data stored in MongoDB by using:

- The TMDB media ID
- The media type, either `movie` or `tv`

## Review CRUD

The review feature includes full CRUD functionality:

- **Create:** Users can submit a review.
- **Read:** Reviews are displayed on the media details page.
- **Update:** Users can edit their own reviews.
- **Delete:** Users can delete their own reviews.

## Rating Functionality

Users can:

- Submit one rating for each movie or TV show.
- Update their existing rating.
- Delete their rating.
- View the average rating submitted by CineTrack users.

## Browse and Search

The Browse page displays a mixture of movies and TV shows.

When no search is entered, CineTrack uses TMDB Discover results.

When a search is entered, CineTrack uses TMDB multi-search and displays only movie and TV results.

Pagination allows users to move between multiple pages of results.

## Future Enhancements

- Add an admin user-management section.
- Add filters by genre, year, rating, and media type.
- Add sorting options to the Browse page.
- Add user profile pages.
- Add review reporting.
- Add password recovery.
- Improve mobile responsiveness.

## Credits

- Movie and TV data is provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).
