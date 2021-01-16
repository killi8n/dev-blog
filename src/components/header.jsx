import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const NavBar = styled.nav`
  box-shadow: 0 2px 4px rgba(3, 27, 78, 0.1);
  background: #ffffff;
  z-index: 15;

  line-height: 44px;
  font-size: 34px;
`;

const Inner = styled.ul`
  background: #ffffff;

  display: flex;
  flex-wrap: nowrap;
  max-width: 100%;

  padding-top: 12px;

  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;

  @media only screen and (max-width: 480px) {
    padding-inline-start: 8px;
  }
`;

const NavBarItem = styled.li`
  list-style: none;

  padding-left: 8px;
  padding-right: 8px;

  font-weight: 600;
`;

const Header = ({ siteTitle }) => (
  <NavBar>
    <Inner>
      <NavBarItem>{siteTitle}</NavBarItem>
    </Inner>
  </NavBar>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
