import { Link, useLocation } from 'react-router-dom';
import logo from 'assets/logo_transparent.png';
import { Logo, Header, InnerBox, Item, SLink } from './styles';

function Navigation() {
  const { pathname } = useLocation();

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

export default Navigation;
