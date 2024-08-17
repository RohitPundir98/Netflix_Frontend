# Entertainment App API Documentation

Welcome to the Entertainment App (Netflix Clone) API documentation. This API provides endpoints to access a wide range of movies, TV shows, trending content, user authentication, and user watchlists.

## Authentication

Authentication is required for certain endpoints to access user-specific features such as watchlists. The authentication process involves registering a new user, logging in.

## Endpoints

### Movies

Endpoints related to movies allow users to retrieve information about movies, fetch details of movies, obtain URLs and more.

- `/movies`: Retrieve all movies based on page number.
- `/movies/:id`: Retrieve details about a single movie based on its ID.

### TV Shows

Endpoints related to TV shows provide functionality to fetch TV shows, get details of any show, and more.

- `/tvshows`: Retrieve all TV shows based on page number.
- `/tvshows/:id`: Retrieve details about a single TV show based on its ID.

### Trending

The trending endpoints allow users to fetch trending movies and TV shows.

- `/trending`: Retrieve all trending movies and TV shows.

### User

Endpoints related to user management enable users to register, login, logout, and manage their watchlists.

- `/user/signup`: Register a new user.
- `/user/login`: Login as an existing user.
- `/user/mylist`: Get a user's watchlist.
- `/user/mylist/:id`: Remove movies or TV shows from a user's watchlist based on ID.

## Error Handling

The API returns appropriate HTTP status codes along with error messages in case of errors. Make sure to handle these errors in your application.

### User Schema

Purpose: Manages user authentication and stores user-specific data.
Collection: Users
