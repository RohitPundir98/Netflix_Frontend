import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { onAuthStateChanged } from "firebase/auth"; // Import from firebase/auth
import { firebaseAuth } from "../utils/firebase-config"; // Import firebaseAuth from firebase-config
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner"; // Import the LoadingSpinner

function Movies() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const movies = useSelector((state) => state.netflix.movies);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch genres when component mounts
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    // Fetch movies when genres are loaded
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "movie" }));
    }
  }, [genresLoaded, dispatch]);

  const [user, setUser] = useState(undefined);

  // Check if user is authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) setUser(currentUser.uid);
      else navigate("/login"); // Redirect to login if not authenticated
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  // Update state based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset !== 0);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simulate loading state
  useEffect(() => {
    if (movies.length > 0) {
      setIsLoading(false);
    }
  }, [movies]);

  return (
    <Container>
      {isLoading ? (
        <LoadingOverlay>
          <LoadingSpinner />
        </LoadingOverlay>
      ) : (
        <>
          <div className="navbar">
            {/* Render navbar */}
            <Navbar isScrolled={isScrolled} />
          </div>
          <div className="data">
            {/* Render movie sliders or show message if no movies available */}
            {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
          </div>
          <Footer />
        </>
      )}
    </Container>
  );
}

// Styled components
const Container = styled.div`
  position: relative;
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Movies;
