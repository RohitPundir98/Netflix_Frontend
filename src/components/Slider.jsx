import React from "react";
import styled from "styled-components";
import CardSlider from "./CardSlider";

// Component for displaying multiple sliders of movies
export default function Slider({ movies }) {
  // Function to get movies from a specific range
  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };

  return (
    <Container>
      {/* Slider for trending movies */}
      <SliderTitle>Trending Now</SliderTitle>
      <CardSlider data={getMoviesFromRange(0, 10)} />

      {/* Slider for new releases */}
      <SliderTitle>New Releases</SliderTitle>
      <CardSlider data={getMoviesFromRange(10, 20)} />

      {/* Slider for blockbuster movies */}
      <SliderTitle>Blockbuster Movies</SliderTitle>
      <CardSlider data={getMoviesFromRange(20, 30)} />

      {/* Slider for popular movies on Netflix */}
      <SliderTitle>Popular on Netflix</SliderTitle>
      <CardSlider data={getMoviesFromRange(30, 40)} />

      {/* Slider for action movies */}
      <SliderTitle>Action Movies</SliderTitle>
      <CardSlider data={getMoviesFromRange(40, 50)} />

      {/* Slider for epic movies */}
      <SliderTitle>Epics</SliderTitle>
      <CardSlider data={getMoviesFromRange(50, 60)} />
    </Container>
  );
}

// Styled container for the sliders
const Container = styled.div`
  margin-top: 2rem;
`;

// Styled title for each slider
const SliderTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 1rem;
  margin-left: 1.5rem;

`;
