import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";

export default function UserListedMovies() {
  return (
    <>
      <Navbar />
      <Container>
        <div>My List Section is Under Construction.....</div>
      </Container>
    </>
  );
}

// Styled container for the UserListedMovies page
const Container = styled.div`
  background-color: #000;
  color: #fff;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  margin: 120px;
`;
