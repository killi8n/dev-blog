import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Bar = styled.div`
  margin-top: 1rem;
`;

const SummaryBar = ({ totalCount }) => (
  <Bar>
    {totalCount}
    {' '}
    articles
  </Bar>
);

SummaryBar.defaultProps = {
  totalCount: 0,
};

SummaryBar.propTypes = {
  totalCount: PropTypes.number,
};

export default SummaryBar;
