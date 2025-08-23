import React from 'react';
import Head from 'next/head';
import { GlassWrapper, Hero, PageContentWrapper } from '@components';
import blogPageBg from '@images/blogPageBgOptimized.jpg';
import { TextField } from '@mui/material';

const Blog = () => {
  const handleChange = () => {
    // const { value } = event?.target as HTMLInputElement;
  };

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
            onChange={() => handleChange()}
          />
        </section>
      </PageContentWrapper>
    </>
  );
};

export default Blog;
