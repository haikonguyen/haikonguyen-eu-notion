import React, { useState } from 'react';
import Head from 'next/head';
import { GlassWrapper, Hero, PageContentWrapper, PostList } from '@components';
import blogPageBg from '@images/blogPageBgOptimized.jpg';
import { TextField } from '@mui/material';
import { getDatabase } from '@utils/notion';
import { BlogPostListType } from 'notion';

const Blog = ({ blogPostList }: BlogPostListType) => {
  const [searchField, setSearchField] = useState('');

  const handleChange = (event: Event | undefined) => {
    const { value } = event?.target as HTMLInputElement;

    setSearchField(value);
  };

  const filteredPosts = blogPostList.filter((post) =>
    post.properties.post_name.title[0]?.plain_text
      .toLowerCase()
      .includes(searchField.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Blog | Haiko Nguyen</title>
      </Head>
      <Hero isHomePage={false} imageSource={blogPageBg}>
        <GlassWrapper>
          <h1>Blog</h1>
        </GlassWrapper>
      </Hero>
      <PageContentWrapper isPost={false}>
        <section className="flex flex-wrap justify-center">
          <TextField
            id="outlined-search"
            label="🔍 search..."
            variant="outlined"
            onChange={() => handleChange(event)}
          />
        </section>
        <section>{<PostList blogPostList={filteredPosts} />}</section>
      </PageContentWrapper>
    </>
  );
};

export async function getStaticProps() {
  const { results } = await getDatabase(`${process.env.DATABASE_ID}`);

  return {
    props: {
      blogPostList: results,
    },
    revalidate: 1,
  };
}

export default Blog;
