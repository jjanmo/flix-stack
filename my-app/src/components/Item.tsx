import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Stars from '@/components/Stars';
import noPosterImage from '@/assets/no_poster.png';

const PosterBox = styled.div`
  position: relative;
  @media screen and (max-width: 1440px) {
    width: 110px;
    height: 160px;
  }
  @media screen and (min-width: 1441px) {
    width: 170px;
    height: 250px;
  }
`;
const Poster = styled.div<{ posterUrl: string }>`
  border-radius: 5px;
  background-image: url(${(props) => props.posterUrl});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.35;
  transition: 0.3s all ease-in-out;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  width: 100%;
  height: 100%;
`;
const Title = styled.span`
  display: inline-block;
  width: 80%;
  position: absolute;
  word-break: break-word;
  text-align: center;
  font-size: 1.2rem;
  transition: 0.3s top ease-in-out, 0.3s opacity ease-in-out 0.2s;
  @media screen and (max-width: 1440px) {
    top: 20%;
  }
  @media screen and (min-width: 1441px) {
    top: 35%;
  }
`;
const ReleasedYear = styled.span`
  position: absolute;
  bottom: 6%;
  left: 10%;
  transition: 0.3s opacity ease-in-out;
`;
const Rating = styled.span`
  position: absolute;
  bottom: 6%;
  right: 10%;
  transition: 0.3s opacity ease-in-out;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0.9rem 0;
  &:hover ${Poster} {
    opacity: 1;
    transform: scale(1.06);
  }
  &:hover ${Title} {
    @media screen and (max-width: 1440px) {
      top: -15%;
    }
    @media screen and (min-width: 1441px) {
      top: -12%;
    }
    opacity: 0;
  }
  &:hover ${Rating} {
    opacity: 0;
  }
  &:hover ${ReleasedYear} {
    opacity: 0;
  }
`;

interface Props {
  id: number;
  title: string;
  poster: string;
  rating: number;
  year: string;
  isMovie?: boolean;
}

function Item({ id, title, poster, rating, year, isMovie = false }: Props) {
  return (
    <Link to={isMovie ? `/movie/${id}` : `/tv/${id}`}>
      <Container>
        <PosterBox>
          <Poster posterUrl={poster ? `https://image.tmdb.org/t/p/w200/${poster}` : noPosterImage} />
        </PosterBox>
        <Title>{title}</Title>
        <ReleasedYear>{year}</ReleasedYear>
        <Rating>
          <Stars full={Math.floor(rating / 2)} isNotHalf={Number.isInteger(rating)} />
        </Rating>
      </Container>
    </Link>
  );
}

export default Item;
