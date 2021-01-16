/* eslint-disable react/prop-types */
import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import SummaryBar from '../components/SummaryBar';
import PostItem from '../components/PostItem';
import PostList from '../components/PostList';
import Pagination from '../components/Pagination';

const PostListTemplate = props => {
  const {
    pageContext: { totalCount, postList: posts, currentPage, numPages },
  } = props;
  return (
    <Layout>
      <SEO title="post list" lang="kr" description="Dev blog" meta={[]} />
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
