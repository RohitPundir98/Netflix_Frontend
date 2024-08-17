import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";

import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner"; // Import LoadingSpinner

function Netflix() {
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
      dispatch(fetchMovies({ type: "all" })).then(() => {
        setIsLoading(false);
      });
    }
  }, [genresLoaded, dispatch]);

  // Redirect to login if user is not authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) navigate("/login");
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

  return (
    <Container>
      {isLoading ? (
        <LoadingOverlay>
          <LoadingSpinner />
        </LoadingOverlay>
      ) : (
        <>
          <Navbar isScrolled={isScrolled} />
          <div className="hero">
            <img
              src={backgroundImage}
              alt="background"
              className="background-image"
            />
            <div className="container">
              <div className="logo">
                <img src={MovieLogo} alt="Movie Logo" />
              </div>
              <div className="buttons flex">
                <button
                  onClick={() => navigate("/player")}
                  className="text-black flex j-center a-center"
                >
                  <FaPlay
                    style={{
                      fill: "black",
                    }}
                  />
                  Play
                </button>
              </div>
            </div>
          </div>
          <Slider movies={movies} />
          <Footer />
        </>
      )}
    </Container>
  );
}

// Styled components
const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .logo {
        img {
          width: 100%;
          height: 100%;
          margin-left: 5rem;
        }
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
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

export default Netflix;
