/* eslint-disable react/prop-types */
import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/_Layout';
import PostDetail from '../components/postDetail';
import SEO from '../components/_SEO';
import LinkedPostList from '../components/linkedPostList';

const PostDetailTemplate = (props) => {
  const {
    pageContext: { next, previous },
    data: {
      markdownRemark: { frontmatter, html, headings },
    },
  } = props;

  return (
    <Layout>
      <SEO title={frontmatter.title} description={frontmatter.spoiler} />
      <PostDetail
        title={frontmatter.title}
        date={frontmatter.date}
        html={html}
        headings={headings}
      />
      <LinkedPostList
        next={
          next
            ? {
              ...next.frontmatter,
              slug: next.fields.slug,
            }
            : null
        }
        previous={
          previous
            ? {
              ...previous.frontmatter,
              slug: previous.fields.slug,
            }
            : null
        }
      />
    </Layout>
  );
};

export default PostDetailTemplate;

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        date
        title
        spoiler
      }
      html
      headings(depth: h1) {
        id
        depth
        value
      }
    }
  }
`;
