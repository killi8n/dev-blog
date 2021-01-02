import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { LinkedPostShape } from "../lib/propTypes"
import { Link } from "gatsby"

const PREV_ICON_STRING = "←"
const NEXT_ICON_STRING = "→"

const PostItem = styled.div`
  flex: 1;
  margin-left: ${props => !props.isPrev && "auto"};
  text-align: ${props => !props.isPrev && "right"};

  display: flex;
  flex-direction: column;

  cursor: pointer;
`

const LinkedPostDescription = styled.p`
  font-weight: 600;
`
const LinkedPostTitle = styled.h3``

const LinkedPostItem = ({ isPrev = false, post }) => {
  const { title, slug } = post
  return (
    <PostItem isPrev={isPrev}>
      <Link to={slug}>
        <LinkedPostDescription>
          {isPrev ? "이전 포스트" : "다음 포스트"}
        </LinkedPostDescription>
        <LinkedPostTitle>
          {isPrev && PREV_ICON_STRING} {title} {!isPrev && NEXT_ICON_STRING}
        </LinkedPostTitle>
      </Link>
    </PostItem>
  )
}

LinkedPostItem.propTypes = {
  isPrev: PropTypes.bool,
  post: LinkedPostShape,
}

export default LinkedPostItem
