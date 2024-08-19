import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { movieApi } from '@/apis';
import styled from 'styled-components';
import Loader from '@/components/Loader';
import HelmetTitle from '@/components/HelmetTitle';
import Stars from '@/components/Stars';
import noPosterImage from '@/assets/no_poster.png';
import { Collection as CollectionType } from '@/types';

const Container = styled.div`
  padding: 0 5rem;
`;
const Background = styled.div<{ backdropUrl: string }>`
  background-image: url(${(props) => props.backdropUrl});
  background-position: center center;
  background-repeat: repeat;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: blur(4px);
  z-index: -1;
  opacity: 0.6;
`;
const Title = styled.h1`
  font-size: 3.5rem;
  margin: 1rem 0;
  display: flex;
  justify-content: left;
  align-content: center;
`;
const Overview = styled.div`
  font-size: 1.2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 1rem 0;
  width: 90%;
`;
const List = styled.ul`
  display: flex;
  margin: 3rem 0;
  padding: 1rem;
  width: 90%;
  overflow: auto;
`;
const Poster = styled.div<{ posterUrl: string; isExisted: boolean }>`
  background-image: url(${(props) => props.posterUrl});
  background-position: center center;
  background-repeat: repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.isExisted ? 1 : 0.7)};
`;
const Name = styled.span`
  position: absolute;
  font-size: 1.3rem;
  top: 10px;
  left: 0;
  transition: 0.4s all ease-in-out;
  text-align: center;
  width: 100%;
`;
const Year = styled.span`
  position: absolute;
  bottom: 10px;
  left: 10px;
  transition: 0.4s all ease-in-out;
`;
const Rating = styled.span`
  position: absolute;
  bottom: 10px;
  right: 10px;
  transition: 0.4s all ease-in-out;
`;
const Item = styled.li`
  list-style: none;
  position: relative;
  margin: 0 1rem;
  border-radius: 5px;
  overflow: hidden;
  transition: 0.3s all ease-in-out;
  &:hover ${Name} {
    opacity: 0;
  }
  &:hover ${Year} {
    opacity: 0;
  }
  &:hover ${Rating} {
    opacity: 0;
  }
  @media (max-width: 1440px) {
    width: 300px;
    height: 200px;
  }
  @media (min-width: 1441px) {
    width: 350px;
    height: 250px;
  }
`;
const Button = styled.button`
  all: unset;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 1rem;
  color: rgb(103, 193, 245);
  background-color: #0e151d;
  padding: 0.1rem 0.5rem;
  margin-left: 1%;
  border-radius: 50%;
  text-transform: uppercase;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  cursor: pointer;
  &:hover {
    background-color: #60b4e4;
    color: white;
  }
`;

const Collection = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [collection, setCollection] = useState<CollectionType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data } = await movieApi.getCollection(Number(id));
      setCollection(data);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleBackClick = () => {
    navigate(-1);
  };

  return isLoading ? (
    <>
      <Loader />
      <HelmetTitle text="Loading" />
    </>
  ) : (
    <Container>
      <Background
        backdropUrl={collection?.backdrop_path ? `https://image.tmdb.org/t/p/w1280/${collection.backdrop_path}` : ''}
      />
      <Title>
        {collection?.name}
        <Button onClick={handleBackClick}>back</Button>
      </Title>
      <Overview>{collection?.overview}</Overview>
      <List>
        {collection?.parts &&
          collection?.parts.map((movie, index) => (
            <Link to={`/movie/${movie.id}`} key={index}>
              <Item>
                <Poster
                  posterUrl={
                    movie.backdrop_path ? `https://image.tmdb.org/t/p/w400${movie.backdrop_path}` : noPosterImage
                  }
                  isExisted={!!movie.backdrop_path}
                />
                <Name>{movie.title}</Name>
                <Year>{movie.release_date || 'Not Updated'}</Year>
                <Rating>
                  <Stars full={Math.floor(movie.vote_average / 2)} isNotHalf={Number.isInteger(movie.vote_average)} />
                </Rating>
              </Item>
            </Link>
          ))}
      </List>
    </Container>
  );
};

export default Collection;
