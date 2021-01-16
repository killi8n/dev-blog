import React from 'react';
import styled from 'styled-components';
import CustomizedPropTypes from '../lib/propTypes';
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

LinkedPostList.defaultProps = {
  next: {
    title: '',
    spoiler: '',
    date: '',
    slug: '',
  },
  previous: {
    title: '',
    spoiler: '',
    date: '',
    slug: '',
  },
};

LinkedPostList.propTypes = {
  next: CustomizedPropTypes.LinkedPostShape,
  previous: CustomizedPropTypes.LinkedPostShape,
};

export default LinkedPostList;
