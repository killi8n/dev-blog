/* eslint-disable react/prop-types */
import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import SummaryBar from '../components/summaryBar';
import PostItem from '../components/postItem';
import PostList from '../components/postList';
import Pagination from '../components/pagination';

const PostListTemplate = props => {
  const {
    pageContext: { totalCount, postList: posts, currentPage, numPages },
  } = props;
  return (
    <Layout>
      <SEO title="post list" />
      <PostList>
        <SummaryBar totalCount={totalCount} />
        {posts.map(post => {
          const { slug } = post.node.fields;
          const { title, date, spoiler } = post.node.frontmatter;
          return (
            <PostItem
              key={slug}
              title={title}
              date={date}
              spoiler={spoiler}
              slug={slug}
            />
          );
        })}
      </PostList>
      <Pagination numPages={numPages} currentPage={currentPage} />
    </Layout>
  );
};

export default PostListTemplate;
