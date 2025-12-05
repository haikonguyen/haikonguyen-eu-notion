import type { Metadata } from 'next';
import { GlassWrapper, Hero, PageContentWrapper } from '@components';
import blogPageBg from '@images/blogPageBgOptimized.jpg';
import { getDatabase } from '@lib/notion';
import { BlogPostType } from 'notion';
import { BlogSearch } from './BlogSearch';

export const metadata: Metadata = {
  title: 'Blog | Haiko Nguyen',
};

export const revalidate = 1;

async function getAllPosts(): Promise<BlogPostType[]> {
  const { results } = await getDatabase(`${process.env.DATABASE_ID}`);
  return results as BlogPostType[];
}

export default async function BlogPage() {
  const blogPostList = await getAllPosts();

  return (
    <>
      <Hero isHomePage={false} imageSource={blogPageBg}>
        <GlassWrapper>
          <h1>Blog</h1>
        </GlassWrapper>
      </Hero>
      <PageContentWrapper isPost={false}>
        <BlogSearch blogPostList={blogPostList} />
      </PageContentWrapper>
    </>
  );
}
