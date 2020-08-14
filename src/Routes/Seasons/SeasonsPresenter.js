import React from 'react';
import styled from 'styled-components';
import Loader from 'Components/Loader';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-content: center;
    width: 90%;
    margin: 1rem auto;
`;
const Background = styled.div`
    background-image: url(${(props) => props.backdropUrl});
    background-position: center center;
    background-repeat: repeat;
    background-size: cover;
    position: absolute;
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
    margin-bottom: 1rem;
    z-index: 1;
    display: flex;
    align-items: center;
`;
const SubTitle = styled.span`
    font-size: 2rem;
    font-style: italic;
    color: #eee;
    margin-bottom: 1rem;
`;
const Overview = styled.div`
    width: 90%;
    font-size: 1.2rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin-bottom: 2rem;
`;
const List = styled.ul`
    display: flex;
    width: 90%;
    margin-bottom: 1rem;
    padding: 1rem 0;
    overflow: auto;
`;
const SLink = styled(Link)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
`;
const Poster = styled.div`
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
const TopBox = styled.div`
    background-color: rgba(0, 0, 0, 0.3);
    padding: 0.2rem 0.4rem;
    width: 95%;
    margin-bottom: 0.5rem;
    border-radius: 5px;
`;
const Name = styled.span`
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
`;
const Row = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;
const Year = styled.div``;
const Episode = styled.div``;
const Item = styled.li`
    list-style: none;
    position: relative;
    margin: 0 1rem;
    width: 200px;
    height: 300px;
    border-radius: 5px;
    overflow: hidden;
`;
const Button = styled.button`
    all: unset;
    display: inline-block;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 1rem;
    color: rgb(103, 193, 245);
    background-color: #0e151d;
    padding: 0.5rem 1rem;
    margin-left: 2%;
    border-radius: 50%;
    text-transform: uppercase;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    cursor: pointer;
    &:hover {
        background-color: #60b4e4;
        color: white;
    }
`;

function SeasonsPresenter({ isLoading, data, handleClick }) {
    return isLoading ? (
        <>
            <Helmet>
                <title>Loading | Nomflix</title>
            </Helmet>
            <Loader />
        </>
    ) : (
        <Container>
            <Helmet>
                <title>{data.name} | Nomflix</title>
            </Helmet>
            <Background backdropUrl={data.backdrop_path ? `https://image.tmdb.org/t/p/w1280/${data.backdrop_path}` : ''} />
            <Title>
                {data.name}
                <Button onClick={handleClick}>back</Button>
            </Title>
            <SubTitle>{data.original_name && data.original_name === data.name ? '' : `( ${data.original_name} )`}</SubTitle>
            <Overview>{data.overview}</Overview>
            <List>
                {data.seasons &&
                    data.seasons.map((season, index) => (
                        <SLink
                            to={{
                                pathname: `/seasons/${data.id}/${season.season_number}`,
                                state: {
                                    name: data.name,
                                    originalName: data.original_name,
                                    backdropUrl: data.backdrop_path
                                        ? `https://image.tmdb.org/t/p/w1280/${data.backdrop_path}`
                                        : '',
                                },
                            }}
                            key={index}
                        >
                            <TopBox>
                                <Name>{season.name}</Name>
                                <Row>
                                    <Year>{season.air_date}</Year>
                                    <Episode>Episode : {season.episode_count}</Episode>
                                </Row>
                            </TopBox>
                            <Item>
                                <Poster
                                    posterUrl={
                                        season.poster_path
                                            ? `https://image.tmdb.org/t/p/w200${season.poster_path}`
                                            : require('../../assets/no_poster.png')
                                    }
                                    isExisted={season.poster_path && true}
                                />
                            </Item>
                        </SLink>
                    ))}
            </List>
        </Container>
    );
}

SeasonsPresenter.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    data: PropTypes.shape({
        name: PropTypes.string,
        backdrop_path: PropTypes.string,
        original_name: PropTypes.string,
        overview: PropTypes.string,
        seasons: PropTypes.arrayOf(
            PropTypes.shape({
                season_number: PropTypes.number,
                name: PropTypes.string,
                air_date: PropTypes.string,
                episode_count: PropTypes.number,
                poster_path: PropTypes.string,
            })
        ),
    }),
    handleClick: PropTypes.func,
};

export default SeasonsPresenter;
