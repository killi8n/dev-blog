import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CircledContainer = styled.div`
  display: flex;
  align-items: center;

  padding-left: 1rem;
  padding-right: 1rem;
  width: auto;
  height: 2rem;
  border-radius: 12px;
  background-color: #4dabf7;
  color: #ffffff;

  position: fixed;
  bottom: 10px;
  right: 10px;

  cursor: pointer;

  transition: background-color 0.15s linear;

  font-weight: 600;

  &:hover {
    background-color: #3b5bdb;
  }

  @media only screen and (max-width: 1365px) {
    display: none;
  }
`;

const ScrollToTop = ({ isSticky }) => {
  const onClick = () => {
    if (typeof window === 'undefined') {
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <CircledContainer onClick={onClick} isSticky={isSticky}>
      Scroll To Top
    </CircledContainer>
  );
};

ScrollToTop.propTypes = {
  isSticky: PropTypes.bool,
};

export default ScrollToTop;
