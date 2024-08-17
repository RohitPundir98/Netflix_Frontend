import React from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function Player() {
  // Hook to handle navigation
  const navigate = useNavigate();

  // URL of the YouTube trailer
  const trailerUrl = "https://www.youtube.com/embed/l5OAxkuq850";

  return (
    <Container>
      <div className="player">
        {/* Back button */}
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        {/* YouTube iframe */}
        <iframe
          src={trailerUrl}
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </Container>
  );
}

// Styled container for the player
const Container = styled.div`
  .player {
    width: 100vw; /* Full width */
    height: 100vh; /* Full height */

    /* Back button positioning */
    .back {
      position: absolute; /* Absolute positioning */
      padding: 2rem; /* Padding around the button */
      z-index: 1; /* Ensuring the button stays above the iframe */

      /* Styling the SVG icon */
      svg {
        font-size: 3rem; /* Icon size */
        cursor: pointer; /* Cursor style */
      }
    }

    /* Styling the iframe */
    iframe {
      height: 100%; /* Fill the parent height */
      width: 100%; /* Fill the parent width */
    }
  }
`;
