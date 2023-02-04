import React from 'react';
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
  getPage,
} from '@utils/notion';
import { AboutPageProps } from 'global-types';
import { NextSeo } from 'next-seo';

const AboutPage = ({ blocks, pageProps }: AboutPageProps) => {
  const domainName = window.location.host;
  const { cover } = pageProps;

  return (
    <>
      <NextSeo
        title="About | Haiko Nguyen"
        description="About | Haiko Nguyen"
        canonical={domainName}
        openGraph={{
          url: `${domainName}/about`,
          title: 'About | Haiko Nguyen',
          description: 'About | Haiko Nguyen',
          images: [
            {
              url: `${cover.external.url}`,
              width: 800,
              height: 600,
              alt: 'AboutPage image',
              type: 'image/jpeg',
            },
          ],
          site_name: 'SiteName',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
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
  const page = await getPage(`${process.env.ABOUT_PAGE_ID}`);

  // Retrieve block children for nested blocks (one level deep), for example toggle blocks
  // https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks

  const nestedChildBlock = await getNestedChildBlock(results);

  const blocksWithChildren = results.map((block) =>
    createBlockWithChildren(block, nestedChildBlock)
  );
  return {
    props: {
      blocks: blocksWithChildren,
      pageProps: page,
    },
    revalidate: 1,
  };
};
