import React, { useEffect, useState } from 'react';
import { tvApi } from 'api';
import styled from 'styled-components';
import HelmetTitle from 'components/HelmetTitle';
import Section from 'components/Section';
import Item from 'components/Item';
import Loader from 'components/Loader';

const Container = styled.div``;

const TV = () => {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [onTheAir, setOnTheAir] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) return <div>{JSON.stringify(error)}</div>;

  return isLoading ? (
    <>
      <Loader />
      <HelmetTitle text="TV" />
    </>
  ) : (
    <Container>
      {popular && popular.length > 0 && (
        <Section title="Popular TVs">
          {popular.map(tv => (
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
          {topRated.map(tv => (
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
          {onTheAir.map(tv => (
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
};

export default TV;
