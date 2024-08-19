import React from 'react';
import loader from 'assets/loader.gif';
import styled from 'styled-components';

const Container = styled.div``;

const Image = styled.div`
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    background-image: url(${loader});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    @media (max-width: 1440px) {
        width: 200px;
        height: 200px;
    }
    @media (min-width: 1441px) {
        width: 300px;
        height: 300px;
    }
`;

function Loader() {
    return (
        <Container>
            <Image />
        </Container>
    );
}

export default Loader;
