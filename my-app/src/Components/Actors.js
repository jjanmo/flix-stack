import React, { useState, useEffect } from 'react';
import { movieApi, tvApi } from 'api';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Container = styled.div`
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 1.1rem;
    margin: 1rem 0;
`;
const Title = styled.h2`
    text-transform: uppercase;
    font-weight: 550;
    font-size: 1.2rem;
    color: #eee;
    margin: 0.5rem 0 1rem;
`;
const List = styled.ul`
    display: grid;
    grid-template-columns: repeat(8, 100px);
    grid-gap: 0.5rem;
    justify-content: left;
    @media (max-width: 1440px) {
        grid-template-columns: repeat(8, 80px);
        grid-template-rows: ${(props) => (props.isOver ? 'repeat(2, 95px)' : 'repeat(1, 95px)')};
    }
    @media (min-width: 1441px) {
        grid-template-columns: repeat(8, 130px);
        grid-template-rows: ${(props) => (props.isOver ? 'repeat(2, 140px)' : 'repeat(1, 140px)')};
    }
`;
const Item = styled.li`
    list-style: none;
    border-radius: 5px;
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
        transform: scale(1.4);
        z-index: 1;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    }
`;
const Profile = styled.div`
    background-image: url(${(props) => props.profileUrl});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
`;
const Name = styled.div`
    font-size: 1rem;
    font-weight: 600;
    position: absolute;
    left: 50%;
    bottom: 5px;
    transform: translate(-50%, 0);
    text-align: center;
    transition: opacity 0.2s ease-in-out;
    opacity: 1;
    ${Item}:hover & {
        opacity: 0;
    }
`;
const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity 0.2s ease-in-out;
    background-color: rgba(0, 0, 0, 0.5);
    ${Item}:hover & {
        background-color: ${(props) => (props.isProfile ? 'transparent' : 'rgba(0, 0, 0, 0.5)')};
    }
`;

function Actors({ id, isMovie = false }) {
    const [actors, setActors] = useState([]);
    const [isOver, setIsOver] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (isMovie) {
                    const {
                        data: { cast },
                    } = await movieApi.getCast(id);
                    const _cast = cast.slice(0, 16);
                    setActors(_cast);
                    if (_cast.length > 8) setIsOver(true);
                } else {
                    const {
                        data: { cast },
                    } = await tvApi.getCast(id);
                    const _cast = cast.slice(0, 16);
                    setActors(_cast);
                    if (_cast.length > 8) setIsOver(true);
                }
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, [id, isMovie]);

    return (
        actors &&
        actors.length > 0 && (
            <Container>
                <Title>actors</Title>
                <List isOver={isOver}>
                    {actors.map((actor, index) => (
                        <Link to={`/actor/${actor.id}`} key={index}>
                            <Item>
                                <Overlay isProfile={!!actor.profile_path} />
                                <Profile
                                    profileUrl={
                                        actor.profile_path
                                            ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                            : require('../assets/no_poster.png')
                                    }
                                />
                                <Name>{actor.name}</Name>
                            </Item>
                        </Link>
                    ))}
                </List>
            </Container>
        )
    );
}

Actors.propTypes = {
    isOver: PropTypes.bool,
    actor: PropTypes.arrayOf({
        id: PropTypes.string.isRequired,
        profile_path: PropTypes.string,
    }),
};

export default Actors;
