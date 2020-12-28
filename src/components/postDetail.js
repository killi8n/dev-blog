import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"

// 69 + 40 = navbar height + header margin top
const HEADING_BREAKPOINT = 69 + 40

const Container = styled.div`
  margin-top: 40px;
  margin-bottom: 10px;

  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
`

const Title = styled.h1`
  margin: 0;
`
const Meta = styled.div`
  padding-top: 10px;
  padding-bottom: 20px;
`
const Date = styled.span``

const Content = styled.div``

const HeadingList = styled.div`
  position: ${props => (props.isSticky ? "fixed" : "absolute")};
  top: ${props => props.isSticky && "10px"};
  margin-left: -190px;
  max-width: 180px;

  @media only screen and (max-width: 1365px) {
    display: none;
  }
`

const HeadingAnchor = styled.a`
  font-weight: ${props => props.selected && "bold"};
  color: ${props => (props.selected ? "#000000" : "#868e96")};
  display: flex;

  font-size: 0.9rem;

  & + & {
    margin-top: 10px;
  }
`

const HeadingContentTitle = styled.p``

const getDimensions = element => {
  const { height } = element.getBoundingClientRect()
  const offsetTop = element.offsetTop
  const offsetBottom = offsetTop + height
  return {
    height,
    offsetTop,
    offsetBottom,
  }
}

const PostDetail = ({ title, date, html, headings }) => {
  const [isSticky, setIsSticky] = useState(false)
  const [h1Elements, setH1Elements] = useState([])
  const [selectedH1Text, setSelectedH1Text] = useState(null)
  const [loading, setLoading] = useState(false)
  const contentRef = useRef(null)
  const onScroll = () => {
    const yValue = window.scrollY
    setIsSticky(yValue > HEADING_BREAKPOINT)

    Promise.resolve().then(() => {
      if (loading) {
        return
      }
      setLoading(true)
      const highlightableHeadings = h1Elements.filter(
        element => yValue >= element.offsetTop - 10
      )
      if (highlightableHeadings.length > 0) {
        const highlightedHeading =
          highlightableHeadings[highlightableHeadings.length - 1]

        if (selectedH1Text === highlightedHeading.innerText) {
          setLoading(false)
          return
        }
        setSelectedH1Text(highlightedHeading.innerText)
      } else {
        setSelectedH1Text(null)
      }
      setLoading(false)
    })
  }

  useEffect(() => {
    const yValue = window.scrollY
    setIsSticky(yValue > HEADING_BREAKPOINT)
  }, [setIsSticky])

  useEffect(() => {
    window.addEventListener("scroll", onScroll)

    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [onScroll])

  useEffect(() => {
    if (contentRef.current) {
      const elements = Array.from(contentRef.current.getElementsByTagName("h1"))
      if (h1Elements.length === 0 && elements.length > 0) {
        elements.forEach(element => {
          element.setAttribute("id", element.innerText)
        })
        setH1Elements(
          Array.from(elements).map(element => {
            return {
              innerText: element.innerText,
              offsetTop: getDimensions(element).offsetTop,
              selected: false,
            }
          })
        )
      }
    }
  }, [contentRef, h1Elements, setH1Elements])

  useEffect(() => {
    if (h1Elements.length === 0) {
      return
    }
    const yValue = window.scrollY
    const highlightableHeadings = h1Elements.filter(
      element => yValue >= element.offsetTop
    )
    if (highlightableHeadings.length > 0) {
      const highlightedHeading =
        highlightableHeadings[highlightableHeadings.length - 1]
      setSelectedH1Text(highlightedHeading.innerText)
    } else {
      setSelectedH1Text(null)
    }
  }, [h1Elements, setSelectedH1Text])

  return (
    <>
      {h1Elements.length > 0 && (
        <HeadingList isSticky={isSticky}>
          <HeadingContentTitle>Contents</HeadingContentTitle>
          {headings.map((heading, index) => {
            return (
              <HeadingAnchor
                key={`${heading.value}-${index}`}
                href={`#${heading.value}`}
                selected={heading.value === selectedH1Text}
              >
                {heading.value}
              </HeadingAnchor>
            )
          })}
        </HeadingList>
      )}
      <Container>
        <Title>{title}</Title>
        <Meta>
          <Date>{date}</Date>
        </Meta>
        <Content ref={contentRef} dangerouslySetInnerHTML={{ __html: html }} />
      </Container>
    </>
  )
}

export default PostDetail
