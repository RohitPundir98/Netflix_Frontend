import React from "react";
import styled from "styled-components";
import background from "../assets/login.jpg";

export default function BackgroundImage() {
  return (
    <Container>
      <img src={background} alt="background" />
    </Container>
  );
}

// Styled component for the container
const Container = styled.div`
  /* Set the height and width of the container to cover the viewport */
  height: 100vh;
  width: 100vw;

  /* Set the image size to cover the container */
  img {
    height: 100%;
    width: 100%;
  }
`;
