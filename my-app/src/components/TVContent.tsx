import styled from 'styled-components';
import Genres from '@/components/Genres';
import Actors from '@/components/Actors';
import { Link, useNavigate } from 'react-router-dom';
import Videos from '@/components/Videos';
import Rank from '@/components/Rank';
import { TV } from '@/types';
import noPosterImage from '@/assets/no_poster.png';

const Container = styled.div`
  display: grid;
  grid-template-columns: 65% 35%;
`;
const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding-left: 5rem;
`;
const Title = styled.h1`
  font-size: 3.5rem;
  margin: 1rem 0 0.5rem;
  display: flex;
  justify-content: left;
  align-items: center;
`;
const SubTitle = styled.span`
  font-size: 2rem;
  font-style: italic;
  color: #eee;
  margin-bottom: 1rem;
`;
const Links = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  margin-bottom: 1rem;
`;
const SeasonsLink = styled(Link)`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 1.1rem;
  color: rgb(103, 193, 245);
  background-color: #0e151d;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  &:hover {
    background-color: #60b4e4;
    color: white;
  }
`;
const Classification = styled.div<{ genresLength: number }>`
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: ${(props) => {
    switch (props.genresLength) {
      case 4: {
        return '1rem';
      }
      case 5: {
        return '0.9rem';
      }
      default: {
        return '1.1rem';
      }
    }
  }};
  margin-bottom: 1rem;
`;
const Year = styled.span``;
const Runtime = styled.span``;
const Divider = styled.span`
  margin: 0 10px;
`;
const IMDbLink = styled.a`
  line-height: 0;
`;
const IMDbLogo = styled.img`
  width: 50px;
`;
const Overview = styled.div`
  font-size: 1.2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin-bottom: 0.5rem;
`;
const RightBox = styled.div`
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Poster = styled.div<{ posterUrl: string; isExisted: boolean }>`
  border-radius: 5px;
  background-image: url(${(props) => props.posterUrl});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  opacity: ${(props) => (props.isExisted ? 1 : 0.5)};
  @media (min-width: 1441px) {
    width: 500px;
    height: 700px;
  }
  @media (max-width: 1440px) {
    width: 300px;
    height: 400px;
  }
`;
const Button = styled.button`
  all: unset;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 1rem;
  color: rgb(103, 193, 245);
  background-color: #0e151d;
  padding: 0.5rem 1rem;
  border-radius: 50%;
  margin-left: 3%;
  text-transform: uppercase;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  cursor: pointer;
  &:hover {
    background-color: #60b4e4;
    color: white;
  }
`;

interface Props {
  tv: TV;
  imdbId: string;
}

function TVContent({ tv, imdbId }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  const runtime = tv.episode_run_time?.[0];

  return (
    <>
      <Container>
        <LeftBox>
          <Title>
            {tv.name}
            <Button onClick={handleClick}>back</Button>
          </Title>
          <SubTitle>{tv.original_name === tv.name ? '' : `( ${tv.original_name} )`}</SubTitle>
          <Links>{tv.seasons && <SeasonsLink to={`/seasons/${tv.id}`}>Seasons</SeasonsLink>}</Links>
          <Classification genresLength={tv.genres && tv.genres.length}>
            <Year>
              {`${tv.first_air_date ? tv.first_air_date.slice(0, 4) : 'Not Updated'} ${
                tv.first_air_date && tv.last_air_date ? ` ~ ${tv.last_air_date.slice(0, 4)}` : ''
              }`}
              <Divider>|</Divider>
            </Year>
            <Runtime>
              {runtime || 'Not Updated'}
              <Divider>|</Divider>
            </Runtime>
            <Genres genres={tv.genres}></Genres>
            <Rank score={tv.vote_average} totalVotes={tv.vote_count} />
            <Divider>|</Divider>
            {imdbId && (
              <IMDbLink href={`https://www.imdb.com/title/${imdbId}`} target="_blank">
                <IMDbLogo src="https://ia.media-imdb.com/images/M/MV5BMTk3ODA4Mjc0NF5BMl5BcG5nXkFtZTgwNDc1MzQ2OTE@._V1_.png" />
              </IMDbLink>
            )}
          </Classification>
          <Overview>{tv.overview}</Overview>
          <Actors id={tv.id} />
          <Videos videos={tv.videos.results} />
        </LeftBox>
        <RightBox>
          <Poster
            posterUrl={tv.poster_path ? `https://image.tmdb.org/t/p/w400${tv.poster_path}` : noPosterImage}
            isExisted={!!tv.poster_path}
          />
        </RightBox>
      </Container>
    </>
  );
}

export default TVContent;
