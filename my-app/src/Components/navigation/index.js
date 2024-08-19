import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import logo from 'assets/logo_transparent.png';
import { Logo, Header, InnerBox, Item, SLink } from './styles';

function Navigation({ location: { pathname } }) {
  return (
    <Header>
      <Link to="/">
        <Logo src={logo}></Logo>
      </Link>
      <InnerBox>
        <Item current={pathname === '/'}>
          <SLink to="/">Home</SLink>
        </Item>
        <Item current={pathname === '/movie'}>
          <SLink to="/movie">Movie</SLink>
        </Item>
        <Item current={pathname === '/tv'}>
          <SLink to="/tv">TV</SLink>
        </Item>
        <Item current={pathname === '/search'}>
          <SLink to="/search">Search</SLink>
        </Item>
      </InnerBox>
    </Header>
  );
}

export default withRouter(Navigation);
