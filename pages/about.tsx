import React from 'react';
import Head from 'next/head';
import {
  GlassWrapper,
  Hero,
  NotionBlocks,
  PageContentWrapper,
} from '@components';
import aboutPageBg from '@images/aboutPageBg.jpg';
import { getBlocks } from '@utils/notion';
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

  const nestedChildBlock = await Promise.all(
    results
      //TODO: fix the type later, omg ...
      .filter((block: any) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );

  const createBlockWithChildren = (block: any) => {
    /* Create new object structure => append nestedChildBlock if needed, for example for toggles
     based on the has_children prop.
   */
    if (block?.has_children && !block[block.type].children) {
      block[block.type]['children'] = nestedChildBlock.find(
        (child) => child.id === block.id
      )?.children;
    }
    return block;
  };
  //TODO: fix the type later, omg ...
  const blocksWithChildren = results.map(createBlockWithChildren);

  return {
    props: {
      blocks: blocksWithChildren,
    },
    revalidate: 1,
  };
};
