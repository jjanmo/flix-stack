import { useEffect, useState, useCallback } from 'react';
import { tvApi } from '@/apis';
import styled from 'styled-components';
import HelmetTitle from '@/components/HelmetTitle';
import Loader from '@/components/Loader';
import Episodes from '@/components/Episodes';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Season as SeasonType } from '@/types';

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 2rem 1rem;
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
  font-size: 3rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
`;
const Name = styled.span``;
const SeasonNumber = styled.span`
  display: inline-block;
  color: #1381c8;
  font-size: 2.5rem;
  margin-left: 0.5rem;
`;
const SubTitle = styled.span`
  font-size: 2rem;
  color: #eee;
  font-style: italic;
  margin: 0.5rem 0;
`;
const Overview = styled.div`
  font-size: 1.2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin-bottom: 1rem;
`;
const Button = styled.button`
  display: inline-block;
  all: unset;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  transform: translateY(-20%);
  font-size: 1rem;
  color: rgb(103, 193, 245);
  background-color: #0e151d;
  padding: 0.5rem 1rem;
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
const EpisodeContainer = styled.div``;

const Season = () => {
  const { id, season: seasonNumber } = useParams();
  const navigate = useNavigate();
  const {
    state: { name, originalName, backdropUrl },
  } = useLocation();

  const [season, setSeason] = useState<SeasonType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    navigate(-1);
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await tvApi.getSeason(Number(id), Number(seasonNumber));
      setSeason(data);
    } finally {
      setIsLoading(false);
    }
  }, [id, seasonNumber]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return isLoading ? (
    <>
      <Loader />
      <HelmetTitle text="Loading" />
    </>
  ) : (
    <Container>
      {season && (
        <>
          <HelmetTitle text={name} />
          <Background backdropUrl={backdropUrl} />
          <Title>
            <Name>
              {''}
              <SeasonNumber>{season.season_number === 0 ? 'Specials' : `Season ${season.season_number}`}</SeasonNumber>
              <Button onClick={handleClick}>back</Button>
            </Name>
            <SubTitle>{name && originalName === name ? '' : `( ${originalName} )`}</SubTitle>
            <SubTitle></SubTitle>
          </Title>
          <Overview>{`${season.overview}` || 'Overview Not Updated'}</Overview>
          <EpisodeContainer>
            {season.episodes && season.episodes.length > 0 && <Episodes episodes={season.episodes} />}
          </EpisodeContainer>
        </>
      )}
    </Container>
  );
};

export default Season;
