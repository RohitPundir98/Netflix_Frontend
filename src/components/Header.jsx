import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";

// Header component
export default function Header(props) {
  const navigate = useNavigate(); // Navigate function from react-router-dom

  return (
    <StyledHeader className="flex a-center j-between">
      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      {/* Login/Signup button */}
      <button onClick={() => navigate(props.login ? "/login" : "/signup")}>
        {props.login ? "Log In" : "Sign In"}
      </button>
    </StyledHeader>
  );
}

// Styled Header component using styled-components
const StyledHeader = styled.header`
  padding: 0 4rem;
  .logo {
    img {
      height: 5rem;
    }
  }
  button {
    padding: 0.5rem 1rem;
    background-color: #e50914;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1.05rem;
  }
`;
