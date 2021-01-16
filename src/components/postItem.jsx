import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Item = styled.li`
  list-style: none;
  margin: 0;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const PostTitle = styled.h2`
  margin: 0;
  cursor: pointer;
`;

const PostSummary = styled.div`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const PostMeta = styled.div`
  font-size: 0.95rem;
`;
const PostDate = styled.span``;

const PostItem = ({
  title, date, spoiler, slug,
}) => (
  <Item>
    <Link to={slug}>
      <PostTitle>{title}</PostTitle>
    </Link>
    <PostSummary>{spoiler}</PostSummary>
    <PostMeta>
      <PostDate>{date}</PostDate>
    </PostMeta>
  </Item>
);

export default PostItem;
