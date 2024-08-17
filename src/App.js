import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import MoviePage from "./pages/Movies";
import Netflix from "./pages/Netflix";
import Signup from "./pages/Signup";
import Player from "./pages/Player";
import TVShows from "./pages/TVShows";
import UserListedMovies from "./pages/UserListedMovies";
import Details from "./components/Details"; // Import the Details component

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for the login page */}
        <Route exact path="/login" element={<Login />} />

        {/* Route for the signup page */}
        <Route exact path="/signup" element={<Signup />} />

        {/* Route for the TV shows page */}
        <Route exact path="/tv" element={<TVShows />} />

        {/* Route for the video player page */}
        <Route exact path="/player" element={<Player />} />

        {/* Route for the movies page */}
        <Route exact path="/movies" element={<MoviePage />} />

        {/* Route for the user's listed movies page */}
        <Route exact path="/mylist" element={<UserListedMovies />} />

        {/* Route for the movie/TV show details page */}
        <Route exact path="/details/:id" element={<Details />} />

        {/* Default route for the Netflix home page */}
        <Route exact path="/" element={<Netflix />} />
      </Routes>
    </BrowserRouter>
  );
}
