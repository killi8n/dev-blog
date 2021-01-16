const { createFilePath } = require('gatsby-source-filesystem');
const path = require('path');
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const relativeFilePath = createFilePath({
      node,
      getNode,
      basePath: 'post',
    });
    createNodeField({
      node,
      name: 'slug',
      value: `/post${relativeFilePath}`,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const postListResult = await graphql(`
    {
      allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
        totalCount
        edges {
          node {
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
  `);

  const {
    allMarkdownRemark: { edges: postList, totalCount },
  } = postListResult.data;

  const postsPerPage = 10;
  const numPages = Math.ceil(postList.length / postsPerPage);

  Array.from({ length: numPages }).forEach((_, index) => {
    createPage({
      path: index === 0 ? '/' : `/list/${index + 1}`,
      component: path.resolve('./src/templates/post-list.tsx'),
      context: {
        totalCount,
        postList: postList.slice(
          index * postsPerPage,
          (index + 1) * postsPerPage
        ),
        currentPage: index + 1,
        numPages,
      },
    });
  });

  postList.forEach(({ node, next, previous }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/post-detail.tsx'),
      context: {
        slug: node.fields.slug,
        next,
        previous,
      },
    });
  });
};
