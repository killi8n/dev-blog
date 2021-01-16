import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';

const PageList = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 1rem;
`;
const PageItem = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  cursor: pointer;
  font-weight: ${(props) => (props.isCurrent ? 'bolder' : 'lighter')};
`;

const Pagination = ({ numPages, currentPage }) => (
  <PageList>
    {Array.from({ length: numPages }).map((_, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <PageItem key={index} isCurrent={currentPage === index + 1}>
        <Link to={index === 0 ? '/' : `/list/${index + 1}`}>{index + 1}</Link>
      </PageItem>
    ))}
  </PageList>
);

Pagination.defaultProps = {
  numPages: 0,
  currentPage: 0,
};

Pagination.propTypes = {
  numPages: PropTypes.number,
  currentPage: PropTypes.number,
};

export default Pagination;
