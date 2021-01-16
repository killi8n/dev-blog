import React, { FC } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Bar = styled.div`
  margin-top: 1rem;
`;

interface Props {
  totalCount: number;
}

const SummaryBar: FC<Props> = ({ totalCount }) => (
  <Bar>{totalCount} articles</Bar>
);

SummaryBar.defaultProps = {
  totalCount: 0,
};

SummaryBar.propTypes = {
  totalCount: PropTypes.number,
};

export default SummaryBar;
