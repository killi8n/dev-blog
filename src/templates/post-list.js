import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SummaryBar from "../components/summaryBar"
import PostItem from "../components/PostItem"
import PostList from "../components/postList"

const PostListTemplate = props => {
  const posts = props.data.allMarkdownRemark.edges
  const { totalCount } = props.data.allMarkdownRemark
  return (
    <Layout>
      <SEO title="post list" />
      <PostList>
        <SummaryBar totalCount={totalCount} />
        {posts.map(post => {
          const { slug } = post.node.fields
          const { title, date, spoiler } = post.node.frontmatter
          return (
            <PostItem
              key={slug}
              title={title}
              date={date}
              spoiler={spoiler}
              slug={slug}
            />
          )
        })}
      </PostList>
    </Layout>
  )
}

export default PostListTemplate

export const pageQuery = graphql`
  {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          frontmatter {
            title
            date
            spoiler
          }
          fields {
            slug
          }
        }
      }
      totalCount
    }
  }
`
