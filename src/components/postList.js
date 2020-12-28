import React from "react"
import styled from "styled-components"

const List = styled.ul`
  margin: 0;
  padding-top: 0.85rem;
`

const PostList = ({ children }) => {
  return <List>{children}</List>
}

export default PostList
