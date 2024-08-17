import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Component to display a message when no movies are available for the selected genre
export default function NotAvailable() {
  const navigate = useNavigate(); // Hook to programmatically navigate

  return (
    <Message>
      No movies available for the selected genre. Please select a different
      genre.
      <HomeButton onClick={() => navigate("/")}>Go to Home</HomeButton>
    </Message>
  );
}

// Styled component for the message
const Message = styled.h1`
  font-size: 1.5rem;
  color: #333;
  text-align: center;
  margin-top: 2rem;
`;

// Styled component for the Home button
const HomeButton = styled.button`
  display: block;
  margin: 2rem auto;
  padding: 0.5rem 1rem;
  background-color: #e50914;
  border: none;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 0.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #b81d26;
  }
`;
