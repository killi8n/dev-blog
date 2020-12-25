import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"

const Header = styled.div`
  margin-top: 40px;
  margin-bottom: 10px;
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

const Heading = styled.div`
  position: absolute;
  top: 12%;
  left: 10%;
  width: 230px;

  @media only screen and (max-width: 480px) {
    display: none;
  }
`

const HeadingInner = styled.div`
  position: ${props => props.isSticky && "fixed"};
  top: ${props => props.isSticky && "10px"};
  width: 230px;
`

// 69 + 40 = navbar height + header margin top
const HEADING_BREAKPOINT = 69 + 40

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
      if (h1Elements.length === 0) {
        const elements = Array.from(
          contentRef.current.getElementsByTagName("h1")
        )
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
      <Heading>
        <HeadingInner isSticky={isSticky}>
          {headings.map((heading, index) => {
            return (
              <div key={`${heading.value}-${index}`}>
                <a
                  href={`#${heading.value}`}
                  style={{
                    fontWeight: heading.value === selectedH1Text && "bold",
                  }}
                >
                  {heading.value}
                </a>
              </div>
            )
          })}
        </HeadingInner>
      </Heading>
      <Header>
        <Title>{title}</Title>
        <Meta>
          <Date>{date}</Date>
        </Meta>
        <Content ref={contentRef} dangerouslySetInnerHTML={{ __html: html }} />
      </Header>
    </>
  )
}

export default PostDetail
