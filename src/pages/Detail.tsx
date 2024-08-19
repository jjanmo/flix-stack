import { useState, useEffect, useCallback } from 'react';
import { movieApi, tvApi } from '@/apis';
import styled from 'styled-components';
import HelmetTitle from '@/components/HelmetTitle';
import MovieContent from '@/components/MovieContent';
import TVContent from '@/components/TVContent';
import Loader from '@/components/Loader';
import { Movie, TV } from '@/types';
import { useLocation, useParams } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
`;
const Background = styled.div<{ backdropUrl: string }>`
  background-image: url(${(props) => props.backdropUrl});
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

const Detail = () => {
  const { id } = useParams();
  const { pathname } = useLocation();

  const [movie, setMovie] = useState<Movie>();
  const [tv, setTV] = useState<TV>();
  const [isLoading, setIsLoading] = useState(false);
  const [imdbId, setImdbId] = useState<string>('');

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      if (pathname.includes('movie')) {
        const { data } = await movieApi.getDetail(Number(id));
        setMovie(data);
      } else {
        const { data } = await tvApi.getDetail(Number(id));
        const {
          data: { imdb_id },
        } = await tvApi.getExternalId(Number(id));
        setTV(data);
        setImdbId(imdb_id);
      }
    } finally {
      setIsLoading(false);
    }
  }, [id, pathname]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
