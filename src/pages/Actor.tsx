import { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { commonApi } from '@/apis';
import HelmetTitle from '../components/HelmetTitle';
import Loader from '@/components/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import { Actor as ActorType } from '@/types';
import noPosterImage from '@/assets/no_poster.png';

const ActorContainer = styled.div`
  width: 70%;
  border-radius: 10px;
  margin: 1rem auto;
  padding: 4rem 0 2rem;
  display: grid;
  grid-template-columns: 40% 60%;
  background-image: url('https://steamstore-a.akamaihd.net/public/images/v6/home/background_spotlight.jpg');
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  position: relative;
`;
const LeftBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
`;
const Profile = styled.div<{ profileUrl: string; isExisted: boolean }>`
  grid-column: 1;
  background-image: url(${(props) => props.profileUrl});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: 5px;
  opacity: ${(props) => (props.isExisted ? 1 : 0.5)};
  @media screen and (max-width: 1440px) {
    width: 280px;
    height: 380px;
  }
  @media screen and (min-width: 1441px) {
    width: 400px;
    height: 600px;
  }
`;
const Name = styled.h1`
  grid-column: 2;
  font-size: 3rem;
  margin-bottom: 1rem;
`;
const IMDbLink = styled.a`
  grid-column: 2;
  margin-left: 1rem;
`;
const IMDbLogo = styled.img`
  width: 50px;
`;
const Bio = styled.div`
  grid-column: 2;
  font-size: 1.2rem;
  width: 90%;
  height: 50vh;
  overflow: auto;
  line-height: 23px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
`;
const Row = styled.div`
  margin: 0.5rem 0;
`;
const Year = styled.span`
  grid-column: 2;
`;
const BirthPlace = styled.span`
  grid-column: 2;
`;
const Divider = styled.span`
  margin: 0 0.5rem;
  color: #eee;
  font-weight: 700;
`;
const Button = styled.button`
  all: unset;
  position: absolute;
  top: 2%;
  left: 50%;
  transform: translate(-50%, 0%);
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 1rem;
  color: rgb(103, 193, 245);
  background-color: #0e151d;
  padding: 0.5rem 1rem;
  border-radius: 50%;
  margin-bottom: 1rem;
  text-transform: uppercase;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  cursor: pointer;
  &:hover {
    background-color: #60b4e4;
    color: white;
  }
`;

const Actor = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [actor, setActor] = useState<ActorType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await commonApi.getActor(Number(id));
      setActor(data);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCloseClick = () => {
    navigate(-1);
  };

  return isLoading ? (
    <>
      <Loader />
      <HelmetTitle text="Loading" />
    </>
  ) : (
    actor && (
      <>
        <HelmetTitle text={actor.name} />
        <ActorContainer>
          <Button onClick={handleCloseClick}>X</Button>
          <LeftBox>
            <Profile
              profileUrl={actor.profile_path ? `https://image.tmdb.org/t/p/w400${actor.profile_path}` : noPosterImage}
              isExisted={!!actor.profile_path}
            />
          </LeftBox>
          <RightBox>
            <Name>
              {actor.name}
              {actor.imdb_id && (
                <IMDbLink href={`https://www.imdb.com/name/${actor.imdb_id}`} target="_blank">
                  <IMDbLogo src="https://ia.media-imdb.com/images/M/MV5BMTk3ODA4Mjc0NF5BMl5BcG5nXkFtZTgwNDc1MzQ2OTE@._V1_.png" />
                </IMDbLink>
              )}
            </Name>
            <Row>
              <Year>{`${actor.birthday ? actor.birthday.substring(0, 4) : 'Not Updated'}  ${
                actor.deathday ? `~ ${actor.deathday.substring(0, 4)}` : actor.birthday ? ' ~ ' : ''
              }`}</Year>
              <Divider>|</Divider>
              <BirthPlace>{actor.place_of_birth || 'Not Updated'}</BirthPlace>
            </Row>
            <Bio>{actor.biography || 'Biography Not Updated'}</Bio>
          </RightBox>
        </ActorContainer>
      </>
    )
  );
};

export default Actor;
