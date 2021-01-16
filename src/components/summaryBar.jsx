import React from 'react';
import styled from 'styled-components';

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

export default SummaryBar;
