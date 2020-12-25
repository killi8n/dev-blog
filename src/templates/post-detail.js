import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import PostDetail from "../components/postDetail"
import SEO from "../components/seo"

const PostDetailTemplate = props => {
  const { fields, frontmatter, html, headings } = props.data.markdownRemark
  return (
    <Layout>
      <SEO title={frontmatter.title} description={frontmatter.spoiler} />
      <PostDetail
        title={frontmatter.title}
        date={frontmatter.date}
        html={html}
        headings={headings}
      />
    </Layout>
  )
}

export default PostDetailTemplate

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
`
