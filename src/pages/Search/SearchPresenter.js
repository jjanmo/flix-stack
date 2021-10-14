import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Loader from 'components/Loader';
import Section from 'components/Section';
import Item from 'components/Item';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;
const Input = styled.input`
  width: 40%;
  background-color: rgba(49, 98, 130, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-decoration: none;
  outline: none;
  color: #fff;
  padding: 0.5rem 2rem;
  font-size: 1.5rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
  margin: 0 1rem;
  border-radius: 2rem;
  box-shadow: 1px 1px 0px rgba(255, 255, 255, 0.2);
  &::placeholder {
    color: rgba(255, 255, 255, 0.8);
    font-family: inherit;
    font-size: 1.5rem;
    text-align: center;
    text-transform: uppercase;
  }
  &:hover {
    box-shadow: 0 0 0 1px #b2bec3;
  }
`;
const Button = styled.button`
  all: unset;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.6);
  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }
`;
const Container = styled.div``;
const MessageContainer = styled.div`
  width: 40%;
  height: 200px;
  margin: 2rem auto;
  padding: 1rem 2rem;
  background-color: #267ba2;
  position: relative;
  font-size: 2rem;
  border-top-right-radius: 3rem;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 6rem;
  border-bottom-right-radius: 3rem;
`;
const Message = styled.div`
  font-family: Arial, helvetica, sans-serif;
  text-align: center;
  padding-top: 1rem;
`;
const SearchTerm = styled.span`
  color: rgba(0, 0, 0, 0.5);
  font-weight: 600;
`;

function SearchPresenter({
  handleFocus,
  handleBlur,
  handleChange,
  handleSubmit,
  isLoading,
  searchTerm,
  movies,
  TVs,
  isSubmitted,
}) {
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="search"
          autocomplete="off"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          maxLength="40"
        />
        <Button>
          <FontAwesomeIcon icon={faSearch} size="2x" />
        </Button>
      </Form>
      {isLoading ? (
        <>
          <Loader />
          <Helmet>
            <title>Loading | Nomflix</title>
          </Helmet>
        </>
      ) : (
        <Container>
          <Helmet>
            <title>{isSubmitted ? `${searchTerm}` : 'Search'} | Nomflix</title>
          </Helmet>
          {movies && movies.length > 0 && (
            <Section title="Movies">
              {movies.map(movie => (
                <Item
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  poster={movie.poster_path}
                  rating={movie.vote_average}
                  year={movie.release_date && movie.release_date.slice(0, 4)}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {TVs && TVs.length > 0 && (
            <Section title="TVs">
              {TVs.map(tv => (
                <Item
                  key={tv.id}
                  id={tv.id}
                  title={tv.name}
                  poster={tv.poster_path}
                  rating={tv.vote_average}
                  year={tv.first_air_date && tv.first_air_date.slice(0, 4)}
                  isMovie={false}
                />
              ))}
            </Section>
          )}
          {searchTerm && movies.length === 0 && TVs.length === 0 && isSubmitted && (
            <MessageContainer>
              <Message>
                No results found for <SearchTerm>{searchTerm}</SearchTerm>
              </Message>
            </MessageContainer>
          )}
        </Container>
      )}
    </>
  );
}

SearchPresenter.propTypes = {
  handleFocus: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitted: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  searchTerm: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      poster_path: PropTypes.string,
      vote_average: PropTypes.number,
      release_date: PropTypes.string,
    })
  ).isRequired,
  TVs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      poster_path: PropTypes.string,
      vote_average: PropTypes.number,
      release_date: PropTypes.string,
    })
  ).isRequired,
};

export default SearchPresenter;
