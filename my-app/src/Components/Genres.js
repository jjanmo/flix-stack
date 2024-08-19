import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.ul`
    display: flex;
`;
const Item = styled.li`
    &:not(:last-child):after {
        content: '·';
        margin: 0 5px;
    }
`;

const Divider = styled.span`
    margin: 0 10px;
`;

function Genres({ genres }) {
    return (
        <>
            <Container>
                {genres && genres.length > 0 && genres.map((genre, index) => <Item key={index}>{genre.name}</Item>)}
            </Container>
            <Divider>|</Divider>
        </>
    );
}

Genres.propTypes = {
    genres: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        })
    ),
};

export default Genres;
