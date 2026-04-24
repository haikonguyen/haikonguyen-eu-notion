import type { Metadata } from 'next';
import { cache } from 'react';
import { Image } from '@imagekit/next';
import { getCoverSource, NotionBlocks, TagList } from '@features/blog';
import { GlassWrapper, PageContentWrapper } from '@components';
import { siteConfig } from '@config';
import {
  createBlockWithChildren,
  EuDateFormat,
  getBlocks,
  getDatabase,
  getNestedChildBlock,
  getPage,
  requireDatabaseId,
} from '@lib/notion';
import { notFound } from 'next/navigation';
import { BlogPage } from '@app-types/notion';

export const revalidate = 1;

/** One Notion DB query per request (shared by generateMetadata + getPostData + static params). */
const getBlogDatabaseCached = cache(async () => {
  const databaseId = requireDatabaseId();
  return getDatabase(databaseId);
});

const getPageSlug = (page: BlogPage): string => {
  const slugProperty =
    page.properties?.slug?.rich_text?.[0]?.plain_text?.trim();
  return slugProperty && slugProperty.length > 0 ? slugProperty : page.id;
};

export async function generateStaticParams() {
  const { results } = await getBlogDatabaseCached();

  return results.map((page) => ({
    slug: getPageSlug(page as BlogPage),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { results } = await getBlogDatabaseCached();

  const matchingPage = results.find((page) => {
    const pageSlug = getPageSlug(page as BlogPage);
    return pageSlug === slug;
  });

  if (!matchingPage) {
    return { title: 'Post Not Found' };
  }

  // Cast to BlogPage for proper type safety on properties
  const page = (await getPage(matchingPage.id)) as BlogPage;

  const title =
    page.properties.post_name.title?.length &&
    page.properties.post_name.title[0]?.plain_text
      ? page.properties.post_name.title[0].plain_text
      : 'Post';
  const description =
    page.properties.excerpt.rich_text[0]?.plain_text ||
    "Read this article on Haiko Nguyen's blog";
  const coverSrc = getCoverSource(page.cover);

  // Ensure image URL is absolute (required by Facebook/Twitter)
  const absoluteImageUrl = coverSrc.startsWith('http')
    ? coverSrc
    : `${siteConfig.url}${coverSrc}`;

  const postUrl = `${siteConfig.url}/post/${slug}`;

  return {
    title: `${title} | Haiko Nguyen`,
    description,
    openGraph: {
      type: 'article',
      url: postUrl,
      title,
      description,
      siteName: 'Haiko Nguyen Blog',
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteImageUrl],
      site: '@haikonguyeneu',
      creator: '@haikonguyeneu',
    },
  };
}

async function getPostData(slug: string) {
  const { results } = await getBlogDatabaseCached();

  const matchingPage = results.find((page) => {
    const pageSlug = getPageSlug(page as BlogPage);
    return pageSlug === slug;
  });

  if (!matchingPage) {
    return null;
  }

  const page = await getPage(matchingPage.id);
  const { results: blockResults } = await getBlocks(matchingPage.id);

  const fullBlocks = blockResults.filter((block) => 'type' in block);
  const nestedChildBlock = await getNestedChildBlock(fullBlocks);
  const blocksWithChildren = fullBlocks.map((block) =>
    createBlockWithChildren(block, nestedChildBlock),
  );

  return { page: page as BlogPage, blocks: blocksWithChildren };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getPostData(slug);

  if (!data) {
    notFound();
  }

  const { page, blocks } = data;
  const coverSrc = getCoverSource(page.cover);
  const postTitle =
    page.properties.post_name.title?.length &&
    page.properties.post_name.title[0]?.plain_text
      ? page.properties.post_name.title[0].plain_text
      : 'Untitled';

  return (
    <>
      <div className="relative flex flex-wrap items-center justify-center h-72 md:h-96 py-24 px-4 mb-5 text-center">
        <Image
          src={coverSrc || '/placeholder.jpg'}
          alt="Post cover image"
          fill
          style={{ objectFit: 'cover' }}
        />

        <GlassWrapper>
          <h1 className="z-10 uppercase">{postTitle}</h1>
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
