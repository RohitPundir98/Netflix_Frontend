import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar";
import NoImage from "../assets/Noimage.png";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Details() {
  const { id } = useParams(); // Get the movie/TV show ID from the URL parameters
  const [details, setDetails] = useState(null); // State to hold movie/TV show details
  const [crew, setCrew] = useState([]); // State to hold crew details
  const [trailer, setTrailer] = useState(null); // State to hold trailer data
  const [isLoading, setIsLoading] = useState(true); // State to handle loading state

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${Your_API_KEY}&append_to_response=credits,videos`
        );
        const data = await response.json();
        setDetails(data);
        setCrew(data.credits.crew.slice(0, 6)); // Limiting crew to the top 6
        setTrailer(
          data.videos.results.find((video) => video.type === "Trailer")
        ); // Find the trailer video
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!details) {
    return <ErrorContainer>Error fetching details.</ErrorContainer>;
  }

  return (
    <>
      <Navbar />
      <Container>
        <TopSection>
          <PosterContainer>
            <img
              src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
              alt={details.title}
            />
          </PosterContainer>
          <InfoContainer>
            <h1>{details.title}</h1>
            <p>
              <b style={{ fontSize: "18px" }}>Overview :</b> {details.overview}
            </p>
            <p>
              <strong>Release Date:</strong> {details.release_date}
            </p>
            <p>
              <strong>Rating:</strong> {details.vote_average.toFixed(1)}
            </p>
            <GenresContainer>
              <strong>Genres:</strong>
              <ul>
                {details.genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
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
              title="Trailer"
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
                      : NoImage
                  }
                  alt={member.name}
                />
                <p>{member.name}</p>
                <p>
                  <strong>{member.job}</strong>
                </p>
              </CrewCard>
            ))}
          </CrewGrid>
        </CrewSection>
      </Container>
    </>
  );
}

// Styled components
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
