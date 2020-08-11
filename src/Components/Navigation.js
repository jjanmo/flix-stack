import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import logo from 'assets/logo_blue.png';

const Logo = styled.img`
    position: absolute;
    top: -15%;
    left: 4%;
    width: 90px;
    border-radius: 5px;
    opacity: 0.7;
    @media screen and (max-width: 1280px) {
        width: 90px;
    }
    @media screen and (min-width: 1281px) {
        width: 110px;
    }
`;

const Header = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    background-color: rgba(10, 20, 29, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    z-index: 2;
`;

const InnerBox = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    width: 70%;
    border-radius: 5px;
    background-color: #3f7293;
    overflow: hidden;
    margin: 1rem;
`;

const Item = styled.li`
    list-style: none;
    width: 100%;
    &:not(:first-child) {
        border-left: 1px solid rgba(0, 0, 0, 0.25);
    }
    &:not(:last-child) {
        border-right: 1px solid rgba(0, 0, 0, 0.25);
    }
    background-color: ${(props) => (props.current ? '#dce5ec' : '#3f7293')};
    color: ${(props) => (props.current ? '#1e272e' : '#d9dadd')};
`;

const SLink = styled(Link)`
    font-size: 1.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 0;
    @media (max-width: 1280px) {
        font-size: 1.2rem;
    }
`;

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
