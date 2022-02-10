import React from 'react';
import Head from 'next/head';
import {
  GlassWrapper,
  Hero,
  NotionBlocks,
  PageContentWrapper,
} from '@components';
import aboutPageBg from '@images/aboutPageBg.jpg';
import {
  createBlockWithChildren,
  getBlocks,
  getNestedChildBlock,
} from '@utils/notion';
import { AboutPageProps } from 'global-types';

const AboutPage = ({ blocks }: AboutPageProps) => {
  return (
    <>
      <Head>
        <title>About | Haiko Nguyen</title>
      </Head>
      <Hero isHomePage={false} imageSource={aboutPageBg}>
        <GlassWrapper>
          <h1>About</h1>
        </GlassWrapper>
      </Hero>
      <PageContentWrapper isPost>
        <NotionBlocks blocks={blocks} />
      </PageContentWrapper>
    </>
  );
};

export default AboutPage;

export const getStaticProps = async () => {
  const { results } = await getBlocks(`${process.env.ABOUT_PAGE_ID}`);

  // Retrieve block children for nested blocks (one level deep), for example toggle blocks
  // https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks

  const nestedChildBlock = await getNestedChildBlock(results);

  const blocksWithChildren = results.map((block) =>
    createBlockWithChildren(block, nestedChildBlock)
  );
  return {
    props: {
      blocks: blocksWithChildren,
    },
    revalidate: 1,
  };
};
