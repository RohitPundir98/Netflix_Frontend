import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import styled from "styled-components";

function Footer() {
  // The URL to be shared

  return (
    <>
      {/* Main Content */}
      <StyledFooter>
        {/* Personal social Media buttons */}
        <div className="social-icons">
          <div className="social-icon">
            {/* Github Profile*/}
            <a
              href="https://github.com/RohitPundir98"
              rel="noreferrer"
              target="_blank"
            >
              <FaGithub className="buttonIcons" size={40} round={true} />
            </a>
          </div>
          {/* Linkedin */}
          <div className="social-icon">
            <a
              href="https://www.linkedin.com/in/rohit-pundir-21b551285/"
              rel="noreferrer"
              target="_blank"
            >
              <FaLinkedin className="buttonIcons" size={40} round={true} />
            </a>
          </div>
          {/* Instagram */}
          <div className="social-icon">
            <a
              href="https://www.instagram.com/rohit_.pundir/?next=%2F"
              rel="noreferrer"
              target="_blank"
            >
              <FaInstagram className="buttonIcons" size={40} round={true} />
            </a>
          </div>
        </div>
      </StyledFooter>
    </>
  );
}

// Styled footer component
const StyledFooter = styled.footer`
  /* Main container styling */
  .social-icons {
    display: flex;
    justify-content: center;
    margin-top: 5vw;
    margin-bottom: 1.5vw;
    margin-left: 10vw;
    margin-right: 10vw;
    color: #fff;
  }

  /* Individual social icon styling */
  .social-icon {
    margin-right: 2vh;
    transition: transform 0.3s;
    color: #fff;
  }

  /* Hover effect */
  .social-icon:hover {
    transform: scale(1.1);
  }
`;

export default Footer;