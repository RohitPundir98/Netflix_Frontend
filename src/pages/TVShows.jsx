import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";

function TVShows() {
  return (
    <>
      <Navbar />
      <Container>
        <div>Tv Show Section is Under Construction.....</div>
      </Container>
    </>
  );
}

// Styled container for the TVShows page
const Container = styled.div`
  background-color: #000;
  color: #white;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  margin: 120px;
`;

export default TVShows;
