import { useEffect, useState } from 'react';
import { tvApi } from '@/apis';
import styled from 'styled-components';
import HelmetTitle from '@/components/HelmetTitle';
import Section from '@/components/Section';
import Item from '@/components/Item';
import Loader from '@/components/Loader';
import { TV as TVType } from '@/types';

const Container = styled.div``;

export default function TV() {
  const [popular, setPopular] = useState<TVType[]>([]);
  const [topRated, setTopRated] = useState<TVType[]>([]);
  const [onTheAir, setOnTheAir] = useState<TVType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const {
        data: { results: _popular },
      } = await tvApi.popular();
      const {
        data: { results: _topRated },
      } = await tvApi.topRated();
      const {
        data: { results: _onTheAir },
      } = await tvApi.onTheAir();

      setPopular(_popular);
      setTopRated(_topRated);
      setOnTheAir(_onTheAir);
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
      <HelmetTitle text="TV" />
    </>
  ) : (
    <Container>
      {popular && popular.length > 0 && (
        <Section title="Popular TVs">
          {popular.map((tv) => (
            <Item
              key={tv.id}
              id={tv.id}
              title={tv.name}
              poster={tv.poster_path}
              rating={tv.vote_average}
              year={tv.first_air_date.slice(0, 4)}
            />
          ))}
        </Section>
      )}
      {topRated && topRated.length > 0 && (
        <Section title="Top Rated TVs">
          {topRated.map((tv) => (
            <Item
              key={tv.id}
              id={tv.id}
              title={tv.name}
              poster={tv.poster_path}
              rating={tv.vote_average}
              year={tv.first_air_date.slice(0, 4)}
            />
          ))}
        </Section>
      )}
      {onTheAir && onTheAir.length > 0 && (
        <Section title="TVs On The Air 7days">
          {onTheAir.map((tv) => (
            <Item
              key={tv.id}
              id={tv.id}
              title={tv.name}
              poster={tv.poster_path}
              rating={tv.vote_average}
              year={tv.first_air_date.slice(0, 4)}
            />
          ))}
        </Section>
      )}
    </Container>
  );
}
