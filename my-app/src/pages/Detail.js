import React, { useState, useEffect, useCallback } from 'react';
import { movieApi, tvApi } from 'api';
import styled from 'styled-components';
import HelmetTitle from 'components/HelmetTitle';
import MovieContent from 'components/MovieContent';
import TVContent from 'components/TVContent';
import Loader from 'components/Loader';

const Container = styled.div`
  width: 100%;
`;
const Background = styled.div`
  background-image: url(${props => props.backdropUrl});
  background-position: center center;
  background-repeat: no-repeat;
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

const Detail = ({ location, match }) => {
  const [movie, setMovie] = useState(null);
  const [tv, setTV] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imdbId, setImdbId] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    const _id = match.params.id;
    const path = location.pathname;
    setIsLoading(true);

    try {
      if (path.includes('movie')) {
        const { data } = await movieApi.getDetail(_id);
        setMovie(data);
      } else {
        console.log();
        const { data } = await tvApi.getDetail(_id);
        const {
          data: { imdb_id },
        } = await tvApi.getExternalId(_id);
        setTV(data);
        setImdbId(imdb_id);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [location, match]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (error) return <div>{JSON.stringify(error)}</div>;

  return isLoading ? (
    <>
      <Loader />
      <HelmetTitle text="Loading" />
    </>
  ) : (
    (movie && (
      <Container>
        <HelmetTitle text={movie.title} />
        <Background
          backdropUrl={movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}` : ''}
        />
        <MovieContent movie={movie} />
      </Container>
    )) ||
      (tv && (
        <Container>
          <HelmetTitle text={tv.name} />
          <Background backdropUrl={tv.backdrop_path ? `https://image.tmdb.org/t/p/w1280/${tv.backdrop_path}` : ''} />
          <TVContent tv={tv} imdbId={imdbId} />
        </Container>
      ))
  );
};

export default Detail;
