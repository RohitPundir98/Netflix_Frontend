import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import LoadingSpinner from "../components/LoadingSpinner";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to handle login process
  const handleLogin = async () => {
    setLoading(true);
    try {
      // Attempt to sign in with email and password
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error.code);
      // Handle login error, if any
    } finally {
      setLoading(false);
    }
  };

  // Check if user is already authenticated
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header />
        {loading ? (
          <LoadingOverlay>
            <LoadingSpinner />
          </LoadingOverlay>
        ) : (
          <div className="form-container flex column a-center j-center">
            <div className="form flex column a-center j-center">
              <div className="title">
                <h3>Login</h3>
              </div>
              <div className="container flex column">
                {/* Input fields for email and password */}
                <input
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                {/* Button to trigger login */}
                <button onClick={handleLogin}>Log In</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}

// Styled components for Login component
const Container = styled.div`
  position: relative;
  height: 100vh; /* Ensures the container takes full viewport height */
  .content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .form-container {
      gap: 2rem;
      .form {
        padding: 2rem;
        background-color: #000000b0;
        width: 25vw;
        gap: 2rem;
        color: white;
        .container {
          gap: 2rem;
          input {
            padding: 0.5rem 1rem;
            width: 15rem;
            border-radius: 8px;
            outline: none;
            color: black;
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
        }
      }
    }
  }

  @media (max-width: 768px) {
    .content {
      .form-container {
        height: auto;
        .form {
          margin-top: 160px;
          width: 80vw;
        }
      }
    }
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Login;
