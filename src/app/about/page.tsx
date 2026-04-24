import type { Metadata } from 'next';
import { GlassWrapper, Hero, PageContentWrapper } from '@components';
import { NotionBlocks } from '@features/blog';
import {
  createBlockWithChildren,
  getBlocks,
  getNestedChildBlock,
} from '@lib/notion';
import aboutPageBg from '@images/aboutPageBg.jpg';

export const metadata: Metadata = {
  title: 'About | Haiko Nguyen',
};

export const revalidate = 1;

const getAboutContent = async () => {
  const pageId = process.env.ABOUT_PAGE_ID?.trim();
  if (!pageId) {
    throw new Error('Missing ABOUT_PAGE_ID env var');
  }

  const { results } = await getBlocks(pageId);

  const fullBlocks = results.filter((block) => 'type' in block);
  const nestedChildBlock = await getNestedChildBlock(fullBlocks);
  const blocksWithChildren = fullBlocks.map((block) =>
    createBlockWithChildren(block, nestedChildBlock),
  );

  return { blocks: blocksWithChildren };
};

export default async function AboutPage() {
  const { blocks } = await getAboutContent();

  return (
    <>
      <Hero isHomePage={false} imageSource={aboutPageBg}>
        <GlassWrapper>
          <h1>About</h1>
        </GlassWrapper>
      </Hero>
      <PageContentWrapper isPost>
        <article>
          <NotionBlocks blocks={blocks} />
        </article>
      </PageContentWrapper>
    </>
  );
}
