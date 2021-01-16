import React from 'react';
import styled from 'styled-components';
import { LinkedPostShape } from '../lib/propTypes';
import LinkedPostItem from './linkedPostItem';

const PostList = styled.div`
  display: flex;
`;

const LinkedPostList = ({ next, previous: prev }) => (
  <PostList>
    {prev && <LinkedPostItem post={prev} isPrev />}
    {next && <LinkedPostItem post={next} />}
  </PostList>
);

LinkedPostList.propTypes = {
  next: LinkedPostShape,
  previous: LinkedPostShape,
};

export default LinkedPostList;
