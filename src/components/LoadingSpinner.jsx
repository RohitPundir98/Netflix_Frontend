import React from "react";
import styled from "styled-components";

const LoadingSpinner = () => {
  return (
    <SpinnerContainer>
      <Spinner />
      <p>Loading...</p>
    </SpinnerContainer>
  );
};

// Styled components for LoadingSpinner
const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  p {
    margin-top: 1rem;
    font-size: 1.2rem;
  }
`;

const Spinner = styled.div`
  border: 8px solid rgba(255, 255, 255, 0.2);
  border-left: 8px solid #e50914;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1.5s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default LoadingSpinner;
