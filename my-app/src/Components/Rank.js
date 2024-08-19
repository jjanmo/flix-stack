import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.span``;
const Wrapper = styled.span`
    margin-left: 0.5rem;
`;
const Score = styled.span`
    font-size: 1.5rem;
`;
const Divider = styled.span`
    color: rgba(53, 59, 72, 1);
    margin-left: 0.2rem;
    font-size: 1rem;
`;
const Total = styled.span`
    color: rgba(53, 59, 72, 1);
    font-size: 1rem;
`;
const TotalVotes = styled.span`
    color: rgba(41, 128, 185, 1);
    margin-left: 0.2rem;
`;

function Rank({ score, totalVotes }) {
    return (
        <Container>
            <FontAwesomeIcon icon={faStar} size="1x" style={{ color: '#f8ce0b' }} />
            <Wrapper>
                <Score title="vote average">{score || 0}</Score>
                <Divider>/</Divider>
                <Total>10</Total>
                <TotalVotes title="total vote count">({totalVotes || 0})</TotalVotes>
            </Wrapper>
        </Container>
    );
}

Rank.propTypes = {
    score: PropTypes.number,
    totalVotes: PropTypes.number,
};
export default Rank;
