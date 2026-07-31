# CineTrack

_A full-stack movie and TV tracking application where users can discover media, create reviews, submit ratings, manage a personal watchlist, and view personalized profiles._

<img width="2318" height="1363" alt="CineTrack home page" src="https://github.com/user-attachments/assets/d449d067-d432-4ba9-9af3-3775e9998d2b" />

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
- Navigate through results using pagination.
- View movie and TV show details.
- Read ratings and reviews submitted by users.

### Signed-In Users

- Create an account.
- Sign in using a username or email.
- Sign out securely.
- Add movies and TV shows to a personal watchlist.
- Remove items from the watchlist.
- View all saved watchlist items.
- Submit one rating for each movie or TV show.
- Update or delete an existing rating.
- Create, edit, and delete personal reviews.
- View a personalized profile page.
- View profile statistics, including:
  - Number of watchlist items
  - Number of reviews
  - Number of ratings
  - Average submitted rating
- View recent reviews and ratings.
- Update personal account information, including username, email, and password.

### Administrators

- Access a protected administration panel.
- View all registered users.
- Create viewer or administrator accounts.
- Edit user information and roles.
- Delete user accounts.
- View individual user profiles.
- View users' watchlist counts, reviews, ratings, and recent activity.
- Access administrator routes through role-based authorization.
- Prevent administrators from deleting their own accounts.

## How to Use

1. Open the CineTrack application.
2. Explore popular and trending movies and TV shows on the home page.
3. Open the Browse page to discover additional media.
4. Use the search form to find a specific movie or TV show.
5. Select a media card to open its details page.
6. Create an account or sign in.
7. Add movies and TV shows to your watchlist.
8. Submit ratings and reviews.
9. Edit or delete your own ratings and reviews.
10. Open the account dropdown to access your profile.
11. Update your information from the profile page.
12. Administrators can open the Admin Panel to manage users.

## Installation

Clone the repository:

```bash
git clone https://github.com/Hussain-Almutawa7/CineTrack.git
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
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

## Technologies Used

### Frontend

- HTML
- CSS
- JavaScript
- EJS
- Bootstrap
- Bootstrap Icons

### Backend

- Node.js
- Express.js
- REST-style routes
- TMDB API

### Database

- MongoDB
- Mongoose

### Authentication and Server Packages

- bcrypt
- express-session
- connect-mongo
- method-override
- morgan
- dotenv

### Development Tools

- Git
- GitHub
- Nodemon

## Application Architecture

CineTrack follows an MVC-style structure:

- **Models:** Define and manage MongoDB data.
- **Views:** Render dynamic pages using EJS.
- **Controllers:** Handle application logic and responses.
- **Routes:** Connect HTTP requests to controller functions.
- **Middleware:** Protect signed-in and administrator-only routes.
- **Services:** Handle communication with the TMDB API.

The application uses session-based authentication, with session data stored in MongoDB through `connect-mongo`.

## TMDB Integration

CineTrack uses the TMDB API to retrieve information such as:

- Titles
- Posters
- Backdrops
- Overviews
- Genres
- Release dates
- Runtime
- Popularity
- Trending media

The application sends separate TMDB requests for movies and TV shows and processes the returned data before rendering it with EJS.

## Database Structure

MongoDB stores information created inside CineTrack, including:

- Users
- Reviews
- Ratings
- Watchlists
- Local media references

The local `Media` model connects TMDB media with CineTrack data using:

- The TMDB media ID
- The media type: `movie` or `tv`

Reviews and ratings reference local Media documents, allowing user activity to remain connected to the correct TMDB title.

## Review CRUD

The review feature includes full CRUD functionality:

- **Create:** Users can submit a review.
- **Read:** Reviews are displayed on media details and profile pages.
- **Update:** Users can edit their own reviews.
- **Delete:** Users can delete their own reviews.

## Rating Functionality

Users can:

- Submit one rating for each movie or TV show.
- Update an existing rating.
- Delete an existing rating.
- View the average rating submitted by CineTrack users.
- View their personal average rating.
- View their three most recent ratings on their profile.

## Watchlist Functionality

Users can:

- Add movies and TV shows to a personal watchlist.
- Remove items from the watchlist.
- View all saved media on a dedicated Watchlist page.
- View the total number of saved items on their profile.

## User Profiles

Each profile displays:

- Username
- Email
- Account role
- Membership date
- Watchlist count
- Review count
- Rating count
- Average submitted rating
- Three most recent reviews
- Three most recent ratings

Users can edit their own username, email, and password.

Administrators can view other users' profiles through the Admin Panel.

## Administrator Functionality

Administrator routes are protected using authentication and role-checking middleware.

Administrators can:

- View all registered users.
- Create new accounts.
- Assign viewer or administrator roles.
- Edit user details and roles.
- Delete user accounts.
- View individual user profiles and activity.

Server-side authorization prevents unauthorized users from accessing administrator functionality.

## Browse and Search

The Browse page displays a mixture of movies and TV shows.

When no search term is entered, CineTrack uses TMDB Discover results.

When a search term is entered, CineTrack uses TMDB multi-search and displays only movie and TV results.

Pagination allows users to navigate through multiple pages of results.

## Future Enhancements

- Add filters by genre, year, rating, and media type.
- Add sorting options to the Browse page.
- Add review reporting and moderation.
- Add password recovery.
- Add email verification.
- Improve mobile navigation and responsiveness.
- Add profile pictures or custom avatars.

## Credits

Movie and TV data is provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).