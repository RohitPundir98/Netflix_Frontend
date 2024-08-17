import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import LoadingSpinner from "../components/LoadingSpinner"; // Import LoadingSpinner

export default React.memo(function Card({ index, movieData, isLiked = false }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [rating, setRating] = useState(6.7);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        setLoading(true);
        const ratingResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movieData.id}?api_key=${Your_API_KEY}`
        );
        if (ratingResponse.ok) {
          const ratingData = await ratingResponse.json();
          const roundedRating = ratingData.vote_average.toFixed(1);
          setRating(roundedRating);
        } else {
          setRating("N/A");
        }
      } catch (error) {
        console.log(error);
        setRating("N/A");
      } finally {
        setLoading(false);
      }
    };

    fetchRating();
  }, [movieData.id]);

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="card"
      />

      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt="card"
            />
            {loading ? (
              <div className="loading-container">
                <LoadingSpinner />
              </div>
            ) : null}
          </div>
          <div className="info-container flex column">
            <h3
              className="name"
              onClick={() => navigate(`/details/${movieData.id}`)}
            >
              {movieData.name}
            </h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                <RiThumbUpFill title="Like" />
                <RiThumbDownFill title="Dislike" />
                <div className="rating-circle">{rating}</div>
                {isLiked ? (
                  <BsCheck title="Added to List" style={{ color: "#00ff00" }} />
                ) : (
                  <AiOutlinePlus title="Add to my list" />
                )}
              </div>

              <div className="info">
                <BiChevronDown title="More Info" />
              </div>
            </div>
            <div className="genres flex">
              <ul className="flex">
                {movieData.genres.map((genre, index) => (
                  <li key={index}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
});

// Styled component for the card container
const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 150%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 99;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 190px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        padding:8px;
        z-index: 4;
        position: absolute;
      }
      .loading-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
      }
    }
    .info-container {
      margin-top: 50px;
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
    .rating-circle {
      background-color: #fff;
      color: #212121;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
    }
  }
`;
