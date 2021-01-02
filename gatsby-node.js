const { createFilePath } = require("gatsby-source-filesystem")
const path = require("path")
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const relativeFilePath = createFilePath({
      node,
      getNode,
      basePath: `post`,
    })
    createNodeField({
      node,
      name: `slug`,
      value: `/post${relativeFilePath}`,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  createPage({
    path: "/",
    component: path.resolve(`./src/templates/post-list.js`),
    context: {},
  })

  const postDetailResult = await graphql(`
    {
      allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
        edges {
          node {
            id
            fields {
              slug
            }
          }
          next {
            id
            fields {
              slug
            }
            frontmatter {
              title
              spoiler
              date
            }
          }
          previous {
            id
            fields {
              slug
            }
            frontmatter {
              title
              spoiler
              date
            }
          }
        }
      }
    }
  `)

  postDetailResult.data.allMarkdownRemark.edges.forEach(
    ({ node, next, previous }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/post-detail.js`),
        context: {
          slug: node.fields.slug,
          next,
          previous,
        },
      })
    }
  )
}
