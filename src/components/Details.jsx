import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar";
import NoImage from "../assets/Noimage.png";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Details() {
  const { id } = useParams(); // Get the movie/show ID from URL
  const [details, setDetails] = useState(null); // Holds movie/show details
  const [crew, setCrew] = useState([]); // Holds crew members
  const [trailer, setTrailer] = useState(null); // Holds trailer info
  const [isLoading, setIsLoading] = useState(true); // Loading state for spinner

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${Your_API_KEY}&append_to_response=credits,videos`
        );
        const data = await response.json();
        setDetails(data); // Store movie/show details
        setCrew(data.credits.crew.slice(0, 6)); // Limit to top 6 crew members
        setTrailer(
          data.videos.results.find((video) => video.type === "Trailer")
        ); // Find the trailer
        setIsLoading(false); // Hide spinner after loading
      } catch (error) {
        console.log(error); // Log any errors
        setIsLoading(false); // Ensure spinner stops on error
      }
    };

    fetchDetails(); // Fetch details on component mount
  }, [id]); // Re-run when `id` changes

  if (isLoading) {
    return <LoadingSpinner />; // Show loading spinner while data is fetching
  }

  if (!details) {
    return <ErrorContainer>Error fetching details.</ErrorContainer>; // Handle failed data fetch
  }

  return (
    <>
      <Navbar />
      <Container>
        <TopSection>
          <PosterContainer>
            <img
              src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
              alt={details.title} // Poster image for the movie/show
            />
          </PosterContainer>
          <InfoContainer>
            <h1>{details.title}</h1> {/* Title of the movie/show */}
            <p>
              <b style={{ fontSize: "18px" }}>Overview:</b> {details.overview}
            </p> {/* Overview/summary */}
            <p>
              <strong>Release Date:</strong> {details.release_date}
            </p> {/* Release date */}
            <p>
              <strong>Rating:</strong> {details.vote_average.toFixed(1)}
            </p> {/* Movie/show rating */}
            <GenresContainer>
              <strong>Genres:</strong>
              <ul>
                {details.genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li> // Display genres
                ))}
              </ul>
            </GenresContainer>
          </InfoContainer>
        </TopSection>
        {trailer && (
          <TrailerSection>
            <h2>Trailer</h2>
            <TrailerIframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Trailer" // Embed trailer video
            ></TrailerIframe>
          </TrailerSection>
        )}
        <CrewSection>
          <h2>Crew</h2>
          <CrewGrid>
            {crew.map((member) => (
              <CrewCard key={member.credit_id}>
                <img
                  src={
                    member.profile_path
                      ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                      : NoImage // Fallback image if no profile picture
                  }
                  alt={member.name}
                />
                <p>{member.name}</p> {/* Crew member name */}
                <p>
                  <strong>{member.job}</strong> {/* Crew member role */}
                </p>
              </CrewCard>
            ))}
          </CrewGrid>
        </CrewSection>
      </Container>
    </>
  );
}

// Styled components for layout and design
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 85px;
`;

const TopSection = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 40px;
`;

const PosterContainer = styled.div`
  flex: 1;
  img {
    border-radius: 10px;
    width: 100%;
    height: auto;
  }
`;

const InfoContainer = styled.div`
  flex: 2;
  margin-left: 60px;
  margin-top: 100px;
  h1 {
    margin-bottom: 20px;
  }
  p {
    margin-bottom: 10px;
  }
`;

const GenresContainer = styled.div`
  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      margin-right: 10px;
    }
  }
`;

const TrailerSection = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-top: 40px;
  h2 {
    margin-bottom: 20px;
  }
`;

const TrailerIframe = styled.iframe`
  width: 100%;
  height: 505px;
  border: none;
  border-radius: 10px;
`;

const CrewSection = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-top: 40px;
  h2 {
    margin-bottom: 20px;
  }
`;

const CrewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
`;

const CrewCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  img {
    border-radius: 10px;
    width: 150px;
    height: 225px;
    object-fit: cover;
    margin-bottom: 10px;
  }
  p {
    margin: 5px 0;
  }
`;

const ErrorContainer = styled.div`
  font-size: 24px;
  text-align: center;
  color: red;
  margin-top: 50px;
`;
