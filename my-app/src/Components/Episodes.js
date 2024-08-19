import React, { useState } from 'react';
import styled from 'styled-components';
import Rank from 'components/Rank';
import PropTypes from 'prop-types';

const Title = styled.h2`
  text-transform: uppercase;
  font-weight: 550;
  font-size: 1.4rem;
  color: #eee;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`;
const List = styled.ul`
  width: 100%;
  margin: 0 auto;
  color: #2c3e50;
  height: 50vh;
  overflow: auto;
`;
const PosterList = styled.ul`
  width: 100%;
  height: 100%;
  position: relative;
`;
const Item = styled.li`
  margin: 1rem auto;
  padding: 1rem;
  border-radius: 10px;
  width: 95%;
  cursor: pointer;
  transition: 0.5s background-color ease-in-out;
  background-color: ${props => (props.isClicked ? '#70a1ff' : '#eee')};
`;

const EpisodeTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;
`;
const EpisodeNumber = styled.span`
  color: #27ae60;
  margin-right: 0.3rem;
`;
const Name = styled.span`
  color: #2980b9;
  font-size: 1.3rem;
`;
const Date = styled.span`
  color: #34495e;
  font-size: 1rem;
  opacity: 0.8;
`;
const Overview = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
  margin: 0.5rem 0;
  color: black;
`;
const StillShot = styled.div`
  background-image: url(${props => props.stillShotPoster});
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 10px;
  transition: all 0.5s ease-in-out;
  opacity: ${props => (props.isClicked ? 1 : 0)};
  z-index: ${props => (props.isClicked ? 1 : 0)};
  background-size: ${props => (props.isExisted ? '100%' : '90% 90%')};
`;
const Order = styled.span`
  position: absolute;
  top: 5%;
  left: 5%;
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: 1px;
  transition: opacity 0.4s ease-in-out;
  opacity: ${props => (props.current ? 1 : 0)};
  color: ${props => (props.isExisted ? '#eee' : '#2d3436')};
`;

function Episodes({ episodes }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = e => {
    const { currentTarget } = e;
    const _index = currentTarget.dataset.index;
    setCurrentIndex(_index);
  };

  return (
    episodes &&
    episodes.length > 0 && (
      <>
        <Title>epsoide</Title>
        <Container>
          <List>
            {episodes.map((episode, index) => (
              <Item
                key={episode.id}
                data-index={index}
                onClick={handleClick}
                id={index}
                isClicked={Number(index) === Number(currentIndex)}
                currentIndex={currentIndex}
                index={index}
              >
                <EpisodeTitle>
                  <EpisodeNumber>{`Episode${episode.episode_number}`}</EpisodeNumber>{' '}
                  <Name>{episode.name || 'Not Updated'}</Name>
                  <Date>{episode.air_date || 'Not Updated'}</Date>
                </EpisodeTitle>
                <Rank score={episode.vote_average} totalVotes={episode.vote_count} />
                <Overview>{episode.overview || 'Overview Not Updated'} </Overview>
              </Item>
            ))}
          </List>
          <PosterList>
            {episodes.map((episode, index) => (
              <StillShot
                key={index}
                isClicked={Number(index) === Number(currentIndex)}
                stillShotPoster={
                  episode.still_path
                    ? `https://image.tmdb.org/t/p/w500${episode.still_path}`
                    : require('../assets/no_poster.png')
                }
                isExisted={episode.still_path && true}
              >
                <Order current={Number(index) === Number(currentIndex)} isExisted={episode.still_path && true}>
                  {episode.still_path
                    ? `S${episode.season_number} E${episode.episode_number}`
                    : 'Still shot Not Updated'}
                </Order>
              </StillShot>
            ))}
          </PosterList>
        </Container>
      </>
    )
  );
}

Episodes.propTypes = {
  episodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      episode_number: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      air_date: PropTypes.string,
      vote_average: PropTypes.number.isRequired,
      vote_count: PropTypes.number.isRequired,
      overview: PropTypes.string.isRequired,
      still_path: PropTypes.string,
      season_number: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Episodes;
