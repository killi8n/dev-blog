import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const Item = styled.li`
  list-style: none;
  margin: 0;
  padding-top: 1rem;
  padding-bottom: 1rem;
`

const PostTitle = styled.h2`
  margin: 0;
  cursor: pointer;

  transition: color 0.15s linear;

  &:hover {
    color: #3b5bdb;
  }
`

const PostSummary = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`

const PostMeta = styled.div`
  font-size: 0.95rem;
`
const PostDate = styled.span``

const PostItem = ({ title, date, spoiler, slug }) => {
  return (
    <Item>
      <Link to={slug}>
        <PostTitle>{title}</PostTitle>
      </Link>
      <PostSummary>{spoiler}</PostSummary>
      <PostMeta>
        <PostDate>{date}</PostDate>
      </PostMeta>
    </Item>
  )
}

export default PostItem
