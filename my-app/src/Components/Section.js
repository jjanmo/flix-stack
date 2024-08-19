import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div``;
const Title = styled.h2`
	font-size: 3rem;
	margin: 1rem 0 2rem;
	text-align: center;
`;
const List = styled.div`
	display: grid;
	margin-bottom: 1rem;
	grid-template-columns: repeat(10, 1fr);
`;

function Section({ title, children }) {
	return (
		<Container>
			<Title>{title}</Title>
			<List>{children}</List>
		</Container>
	);
}

Section.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
};

export default Section;
