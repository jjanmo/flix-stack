import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

function Stars({ full, isNotHalf }) {
    const defaultStars = [0, 1, 2, 3, 4];
    return (
        <>
            {defaultStars.map((_, index) => {
                if (index < full) {
                    return <FontAwesomeIcon key={index} icon={faStar} size="sm" style={{ color: '#f8ce0b' }} />;
                } else if (index === full && !isNotHalf) {
                    return <FontAwesomeIcon key={index} icon={faStarHalfAlt} size="sm" style={{ color: '#f8ce0b' }} />;
                } else return null;
            })}
        </>
    );
}

Stars.propTypes = {
    full: PropTypes.number.isRequired,
    isNotHalf: PropTypes.bool.isRequired,
};

export default Stars;
