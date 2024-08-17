import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import LoadingSpinner from "../components/LoadingSpinner"; // Import LoadingSpinner

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  // Function to handle user sign up
  const handleSignIn = async () => {
    setLoading(true);
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Redirect user to home page if already signed in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) navigate("/");
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header login />
        {loading ? (
          <LoadingOverlay>
            <LoadingSpinner />
          </LoadingOverlay>
        ) : (
          <div className="body flex column a-center j-center">
            <div className="text flex column">
              <h1>Unlimited movies, TV shows, and more.</h1>
              <h4>Watch anywhere. Cancel anytime.</h4>
              <h6>
                Ready to watch? Enter your email to create or restart
                membership.
              </h6>
            </div>
            <div className="form">
              <input
                type="email"
                placeholder="Email address"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    email: e.target.value,
                  })
                }
                value={formValues.email}
              />
              {showPassword && (
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      password: e.target.value,
                    })
                  }
                  value={formValues.password}
                />
              )}
              {!showPassword ? (
                <button onClick={() => setShowPassword(true)}>
                  Get Started
                </button>
              ) : (
                <button onClick={handleSignIn}>Sign In</button>
              )}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}

// Styled container for the signup page
const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  background-color: black;

  .content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);

    .body {
      text-align: center;
      max-width: 600px;
      width: 100%;

      .text {
        color: white;
        margin-bottom: 2rem;

        h1 {
          font-size: 2.5rem;
          margin: 0;
        }
        h4 {
          font-size: 1.5rem;
          margin: 0.5rem 0;
        }
        h6 {
          font-size: 1rem;
          margin-top: 1rem;
        }
      }

      .form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        gap: 1rem;

        input {
          width: 100%;
          padding: 1rem;
          font-size: 1rem;
          border: 1px solid black;
          border-radius: 7px;
          margin-bottom: 1rem;
          outline: none;
          color: black;
        }

        button {
          padding: 0.5rem 2rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: bold;
          font-size: 1rem;
          border-radius: 7px;
          transition: background-color 0.3s;

          &:hover {
            background-color: #f40612;
          }
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

export default Signup;
