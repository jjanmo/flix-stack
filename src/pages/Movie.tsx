import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Section from '@/components/Section';
import Loader from '@/components/Loader';
import Item from '@/components/Item';
import { movieApi } from '@/apis';
import HelmetTitle from '../components/HelmetTitle';
import { Movie as MovieType } from '@/types';

const Container = styled.div``;

const Movie = () => {
  const [popular, setPopular] = useState<MovieType[]>([]);
  const [topRated, setTopRated] = useState<MovieType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const {
        data: { results: _popular },
      } = await movieApi.popular();
      const {
        data: { results: _topRated },
      } = await movieApi.topRated();

      setPopular(_popular);
      setTopRated(_topRated);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <>
      <Loader />
      <HelmetTitle text="Movie" />
    </>
  ) : (
    <Container>
      {popular && popular.length > 0 && (
        <Section title="Popular Movies">
          {popular.map((movie) => (
            <Item
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster={movie.poster_path}
              rating={movie.vote_average}
              year={movie.release_date.slice(0, 4)}
              isMovie
            />
          ))}
        </Section>
      )}
      {topRated && topRated.length > 0 && (
        <Section title="Top Rated Movies">
          {topRated.map((movie) => (
            <Item
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster={movie.poster_path}
              rating={movie.vote_average}
              year={movie.release_date.slice(0, 4)}
              isMovie
            />
          ))}
        </Section>
      )}
    </Container>
  );
};

export default Movie;
