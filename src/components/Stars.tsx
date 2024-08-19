import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfAlt, faStar } from '@fortawesome/free-solid-svg-icons';

interface Props {
  full: number;
  isNotHalf: boolean;
}

function Stars({ full, isNotHalf }: Props) {
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

export default Stars;
