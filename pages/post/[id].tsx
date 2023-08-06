import Head from 'next/head';
import {
  getDatabase,
  getPage,
  getBlocks,
  getNestedChildBlock,
  createBlockWithChildren,
} from '@utils/notion';
import { PostTemplateProps } from 'notion';
import Image from 'next/image';
import { getCoverSource } from '../../components/post-card/utils';
import { GlassWrapper, NotionBlocks, TagList } from '@components';
import { GetStaticPropsType } from 'global-types';
import PageContentWrapper from '../../components/page-content-wrapper/page-content-wrapper';
import { EuDateFormat } from '@utils/text-formatting';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { siteConfig } from '../../constants';

interface TagProps {
  color: string;
  id: string;
  name: string;
}

export default function PostTemplate({ page, blocks }: PostTemplateProps) {
  const { asPath } = useRouter();
  if (!page || !blocks) {
    return <></>;
  }

  const publishedDate = page.properties.published_date.date?.start;
  const tags = page.properties.tags.multi_select.map((tag: TagProps) => {
    return tag.name;
  });
  const url = siteConfig.url + asPath;
  const coverImg = page.cover.file.url;

  return (
    <>
      <NextSeo
        openGraph={{
          type: 'article',
          article: {
            publishedTime: publishedDate,
            modifiedTime: '2022-01-21T18:04:43Z',
            tags: tags,
          },
          url,
          title: `${page.properties.post_name.title[0].plain_text}`,
          description: 'Open Graph Description',
          images: [
            {
              url: coverImg,
              width: 800,
              height: 600,
              alt: 'Og Image Alt',
            },
          ],
        }}
      />

      <Head>
        <title>{page.properties.post_name.title[0].plain_text}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative flex flex-wrap items-center justify-center h-72 md:h-96 py-24 px-4 mb-5 text-center">
        <Image
          src={getCoverSource(page.cover)}
          alt="Post cover image"
          fill
          placeholder="blur"
          blurDataURL={getCoverSource(page.cover)}
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
              | {EuDateFormat(page.properties.published_date.date?.start)}
            </span>
          </div>
        </GlassWrapper>
        <section className="absolute bottom-0.5 left-0.5 z-10">
          <TagList tags={page.properties.tags.multi_select} />
        </section>
      </div>

      <PageContentWrapper isPost>
        <article>
          <NotionBlocks blocks={blocks} />
        </article>
      </PageContentWrapper>
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

export const getStaticProps = async ({ params }: GetStaticPropsType) => {
  const { id } = params;
  const page = await getPage(id);
  const { results } = await getBlocks(id);

  const nestedChildBlock = await getNestedChildBlock(results);

  const blocksWithChildren = results.map((block) =>
    createBlockWithChildren(block, nestedChildBlock)
  );

  return {
    props: {
      page,
      blocks: blocksWithChildren,
    },
    revalidate: 1,
  };
};
