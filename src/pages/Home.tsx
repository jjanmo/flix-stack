import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Section from '@/components/Section';
import Loader from '@/components/Loader';
import Item from '@/components/Item';
import { movieApi, tvApi } from '@/apis';
import HelmetTitle from '../components/HelmetTitle';
import { Movie, TV } from '@/types';

const Container = styled.div``;

const Home = () => {
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [airingToday, setAiringToday] = useState<TV[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const {
        data: { results: _nowPlaying },
      } = await movieApi.nowPlaying();

      const {
        data: { results: _upcoming },
      } = await movieApi.upcoming();

      const {
        data: { results: _airingToday },
      } = await tvApi.airingToday();

      setNowPlaying(_nowPlaying);
      setUpcoming(_upcoming);
      setAiringToday(_airingToday);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <>
      <HelmetTitle text="Loading" />
      <Loader />
    </>
  ) : (
    <Container>
      <HelmetTitle text="Home" />
      {nowPlaying && nowPlaying.length > 0 && (
        <Section title="Now Playing Movies">
          {nowPlaying.map((movie) => (
            <Item
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster={movie.poster_path}
              rating={movie.vote_average}
              year={movie.release_date?.slice(0, 4)}
              isMovie
            />
          ))}
        </Section>
      )}
      {upcoming && upcoming.length > 0 && (
        <Section title="Upcoming Movies">
          {upcoming.map((movie) => (
            <Item
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster={movie.poster_path}
              rating={movie.vote_average}
              year={movie.release_date?.slice(0, 4)}
              isMovie
            />
          ))}
        </Section>
      )}
      {airingToday && airingToday.length > 0 && (
        <Section title="Today Airing TVs">
          {airingToday.map((tv) => (
            <Item
              key={tv.id}
              id={tv.id}
              title={tv.name}
              poster={tv.poster_path}
              rating={tv.vote_average}
              year={tv.first_air_date?.slice(0, 4)}
              isMovie={false}
            />
          ))}
        </Section>
      )}
    </Container>
  );
};

export default Home;
