import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import db from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export const Details = () => {
  const { id } = useParams(); // Get the movie ID from route params
  const [detailData, setDetailData] = useState(null); // Initialize with null for better type handling
  const [loading, setLoading] = useState(true); // Add loading state to improve UX

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        if (!id) return; // Ensure `id` exists before making a call
        const colRef = doc(db, 'movies', id);
        const docSnap = await getDoc(colRef);

        if (docSnap.exists()) {
          setDetailData(docSnap.data());
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false); // Stop loading once the operation is complete
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <LoadingMessage>Loading...</LoadingMessage>; // Display a loading message while fetching data
  }

  if (!detailData) {
    return <ErrorMessage>Movie details not found!</ErrorMessage>; // Handle case where no data is found
  }

  return (
    <Container>
      {/* Background Image */}
      <Background>
        <img alt={detailData.title} src={detailData.backgroundImg} />
      </Background>

      {/* Title Image */}
      <ImageTitle>
        <img alt={detailData.title} src={detailData.titleImg} />
      </ImageTitle>

      {/* Content Section */}
      <ContentMeta>
        {/* Controls */}
        <Controls>
          <Link to={`/video`}>
            <Player>
              <img alt="Play Icon" src="/images/play-icon-black.png" />
              <span>Play</span>
            </Player>
          </Link>
          <Link to={`/video`}>
            <Trailer>
              <img alt="Trailer Icon" src="/images/play-icon-white.png" />
              <span>Trailer</span>
            </Trailer>
          </Link>
          <AddList>
            <span />
            <span />
          </AddList>
          <GroupWatch>
            <div>
              <img alt="Group Watch Icon" src="/images/group-icon.png" />
            </div>
          </GroupWatch>
        </Controls>

        {/* Subtitle and Description */}
        <SubTitle>{detailData.subTitle}</SubTitle>
        <Description>{detailData.description}</Description>
      </ContentMeta>
    </Container>
  );
};

// Styled Components

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
`;

const Background = styled.div`
  left: 0;
  opacity: 0.8;
  position: fixed;
  right: 0;
  top: 0;
  z-index: -1;

  img {
    width: 100vw;
    height: 100vh;

    @media (max-width: 768px) {
      width: auto;
    }
  }
`;

const ImageTitle = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: flex-start;
  margin: auto;
  height: 30vw;
  min-height: 170px;
  padding-bottom: 24px;

  img {
    max-width: 600px;
    min-width: 200px;
    width: 35vw;
    object-fit: contain; /* Ensures proper image scaling */
  }
`;

const ContentMeta = styled.div`
  max-width: 874px;
`;

const Controls = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin: 24px 0;
`;

const Player = styled.button`
  font-size: 15px;
  margin-right: 22px;
  padding: 0px 24px;
  height: 56px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
 background-color:white 
box-shadow
