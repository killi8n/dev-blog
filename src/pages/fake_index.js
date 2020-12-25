import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import SummaryBar from "../components/summaryBar"
import PostItem from "../components/PostItem"
import PostList from "../components/postList"

const IndexPage = props => {
  const posts = props.data.allMarkdownRemark.edges
  const { totalCount } = props.data.allMarkdownRemark
  return (
    <Layout>
      <SEO title="Home" />
      <SummaryBar totalCount={totalCount} />
      <PostList>
        {posts.map(post => {
          const { title, date, spoiler } = post.node.frontmatter
          return <PostItem title={title} date={date} spoiler={spoiler} />
        })}
      </PostList>
    </Layout>
  )
}

export default IndexPage

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
        }
      }
      totalCount
    }
  }
`
