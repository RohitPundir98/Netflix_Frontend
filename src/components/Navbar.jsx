import { signOut } from "firebase/auth";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { firebaseAuth } from "../utils/firebase-config";
import { FaSignOutAlt } from "react-icons/fa";

// Navbar component
export default function Navbar({ isScrolled }) {
  const location = useLocation();
  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];

  return (
    <Container>
      {/* Navigation bar */}
      <nav className={`${isScrolled ? "scrolled" : ""} flex`}>
        {/* Left section */}
        <div className="left flex a-center">
          {/* Brand logo */}
          <div className="brand flex a-center j-center">
            <img src={logo} alt="Logo" />
          </div>
          {/* Navigation links */}
          <ul className="links flex">
            {links.map(({ name, link }) => {
              const isActive = location.pathname === link;
              return (
                <li key={name} className={isActive ? "active" : ""}>
                  <Link to={link}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        {/* Right section */}
        <div className="right flex a-center">
          {/* Sign out button */}
          <button onClick={() => signOut(firebaseAuth)}>
            <StyledSignOutIcon />
          </button>
        </div>
      </nav>
    </Container>
  );
}

// Styled container for the Navbar component
const Container = styled.div`
  /* Styling for the navbar when scrolled */
  .scrolled {
    background-color: black;
  }
  /* Styling for the navigation bar */
  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    /* Styling for the left section of the navbar */
    .left {
      gap: 2rem;
      /* Styling for the brand logo */
      .brand {
        img {
          height: 4rem;
        }
      }
      /* Styling for the navigation links */
      .links {
        list-style-type: none;
        gap: 2rem;
        li {
          a {
            color: white;
            text-decoration: none;
            font-size: 1rem;
            transition: font-size 0.3s, text-decoration 0.3s;
          }
        }
        /* Styling for the active link */
        .active {
          a {
            text-decoration: underline;
            font-size: 1.2rem;
          }
        }
      }
    }
    /* Styling for the right section of the navbar */
    .right {
      gap: 1rem;
      /* Styling for the sign out button */
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: #fff;
          font-size: 1.8rem;
        }
      }
    }
  }
`;

const StyledSignOutIcon = styled(FaSignOutAlt)`
  color: inherit; /* Default color */
  transition: color 0.3s ease;

  &:hover {
    fill: red; /* Change to red on hover */
  }
`;
