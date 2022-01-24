import React, { Fragment } from 'react';
import Head from 'next/head';
import { getDatabase, getPage, getBlocks, renderBlock } from '@utils/notion';
import { PostTemplateProps } from 'notion';
import Image from 'next/image';
import { getCoverSource } from '../../components/post-card/utils';
import { GlassWrapper, TagList } from '@components';

export default function PostTemplate({ page, blocks }: PostTemplateProps) {
  if (!page || !blocks) {
    return <></>;
  }

  return (
    <>
      <Head>
        <title>{page.properties.post_name.title[0].plain_text}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative flex flex-col items-center justify-center h-96 py-24 px-4 mb-5 text-center">
        <Image
          src={getCoverSource(page.cover)}
          alt="Post cover image"
          objectFit="cover"
          layout="fill"
          placeholder="blur"
          blurDataURL={getCoverSource(page.cover)}
          className="brightness-50"
        />

        <GlassWrapper>
          <h1 className="z-10 uppercase">
            {page.properties.post_name.title[0].plain_text}
          </h1>
          <div className="items-center flex">
            <span className="mr-1">
              {page.properties.author.created_by.name}
            </span>
            <span className="mr-1">
              | {page.properties.published_date.date?.start}
            </span>
          </div>
        </GlassWrapper>
        <section className="absolute bottom-0.5 left-0.5 z-10">
          <TagList tags={page.properties.tags.multi_select} />
        </section>
      </div>

      <article className="md:max-w-7xl mx-auto my-0 p-4 md:p-16">
        {blocks.map((block) => (
          <Fragment key={block.id}>{renderBlock(block)}</Fragment>
        ))}
      </article>
    </>
  );
}

export const getStaticPaths = async () => {
  const { results } = await getDatabase(`${process.env.DATABASE_ID}`);

  return {
    paths: results.map((page) => ({
      params: {
        id: page.id,
      },
    })),
    fallback: true,
  };
};

interface GetStaticPropsType {
  params: {
    id: string;
  };
}

export const getStaticProps = async ({ params }: GetStaticPropsType) => {
  const { id } = params;
  const page = await getPage(id);
  const { results } = await getBlocks(id);

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
      page,
      blocks: blocksWithChildren,
    },
    revalidate: 1,
  };
};
