import React, {
  useEffect, useRef, useState, useCallback,
} from 'react';
import styled from 'styled-components';
import ScrollToTop from './scrollToTop';

// 69 + 40 = navbar height + header margin top
const HEADING_BREAKPOINT = 69 + 40;

const Container = styled.div`
  margin-top: 40px;
  margin-bottom: 10px;

  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h1`
  margin: 0;
`;
const Meta = styled.div`
  padding-top: 10px;
  padding-bottom: 20px;
`;
const Date = styled.span``;

const Content = styled.div``;

const HeadingList = styled.div`
  position: ${(props) => (props.isSticky ? 'fixed' : 'absolute')};
  top: ${(props) => props.isSticky && '10px'};
  margin-left: -250px;
  max-width: 180px;

  @media only screen and (max-width: 1365px) {
    display: none;
  }
`;

const HeadingAnchor = styled.a`
  font-weight: ${(props) => props.selected && 'bold'};
  color: ${(props) => (props.selected ? '#000000' : '#868e96')};
  display: flex;

  font-size: 0.9rem;

  & + & {
    margin-top: 10px;
  }
`;

const HeadingContentTitle = styled.h3``;

const PostDetail = ({
  title, date, html, headings,
}) => {
  const [isSticky, setIsSticky] = useState(false);
  const [currentHead, setCurrentHead] = useState('');
  const contentRef = useRef(null);

  const onScroll = useCallback(() => {
    Promise.resolve().then(() => {
      if (!window) {
        return;
      }
      const currentIsSticky = window.scrollY > HEADING_BREAKPOINT;
      if (!currentIsSticky) {
        setCurrentHead('');
      }
      setIsSticky(currentIsSticky);
      const contentSection = contentRef.current;
      if (contentSection) {
        const heads = Array.from(contentSection.getElementsByTagName('h1'));
        if (heads.length > 0) {
          let viewingHead = currentHead;
          heads.forEach((head) => {
            if (!head.getAttribute('id')) {
              head.setAttribute('id', head.innerText);
            }
            if (window.scrollY + 10 >= head.offsetTop) {
              viewingHead = head.innerText;
            }
          });
          if (viewingHead !== currentHead) {
            setCurrentHead(viewingHead);
          }
        }
      }
    });
  }, [contentRef, currentHead, setCurrentHead]);

  useEffect(() => {
    onScroll();
    if (window) {
      window.addEventListener('scroll', onScroll);
    }

    return () => {
      if (window) {
        window.removeEventListener('scroll', onScroll);
      }
    };
  }, [onScroll]);

  return (
    <>
      {headings.length > 0 && (
        <HeadingList isSticky={isSticky}>
          <HeadingContentTitle>Contents</HeadingContentTitle>
          {headings.map((heading, index) => (
            <HeadingAnchor
              key={`${heading.value}-${index}`}
              href={`#${heading.value}`}
              selected={heading.value === currentHead}
            >
              {heading.value}
            </HeadingAnchor>
          ))}
        </HeadingList>
      )}
      <Container>
        <Title>{title}</Title>
        <Meta>
          <Date>{date}</Date>
        </Meta>
        <Content ref={contentRef} dangerouslySetInnerHTML={{ __html: html }} />
      </Container>
      <ScrollToTop isSticky={isSticky} />
    </>
  );
};

export default PostDetail;
