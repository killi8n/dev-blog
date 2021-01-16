import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const List = styled.ul`
  margin: 0;
  padding-top: 0.85rem;
`;

const PostList = ({ children }) => <List>{children}</List>;

PostList.defaultProps = {
  children: null,
};

PostList.propTypes = {
  children: PropTypes.node,
};

export default PostList;
