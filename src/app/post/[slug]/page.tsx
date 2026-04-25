import type { Metadata } from 'next';
import { cache } from 'react';
import Image from 'next/image';
import { getCoverSource, NotionBlocks, TagList } from '@features/blog';
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
import Container from '@components/layout/container/container';

export const revalidate = 1;

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

  const page = (await getPage(matchingPage.id)) as BlogPage;

  const title =
    page.properties.post_name.title?.length &&
    page.properties.post_name.title[0]?.plain_text
      ? page.properties.post_name.title[0].plain_text
      : 'Post';
  const description =
    page.properties.excerpt.rich_text[0]?.plain_text ||
    "Read this article on Haiko Nguyen's blog";
  
  // High-fidelity cover detection
  const imagekitPath = (page.properties as any).imagekit_path?.rich_text?.[0]?.plain_text;
  const coverSrc = getCoverSource(page.cover, imagekitPath);
  
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
  
  // High-fidelity cover detection
  const imagekitPath = (page.properties as any).imagekit_path?.rich_text?.[0]?.plain_text;
  const coverSrc = getCoverSource(page.cover, imagekitPath);
  
  const postTitle =
    page.properties.post_name.title?.length &&
    page.properties.post_name.title[0]?.plain_text
      ? page.properties.post_name.title[0].plain_text
      : 'Untitled';

  return (
    <main className="pt-32 pb-20 bg-background min-h-screen">
      <Container>
        {/* Cinematic Header */}
        <div className="relative h-[60vh] min-h-[400px] w-full rounded-[3rem] overflow-hidden mb-16 border border-white/10 shadow-2xl">
          <Image
            src={coverSrc}
            alt={postTitle}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col justify-end p-12 md:p-20">
            <div className="max-w-4xl space-y-6">
              <div className="flex flex-wrap gap-3">
                 <TagList tags={page.properties.tags.multi_select} />
              </div>
              <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white leading-[1.1]">
                {postTitle}
              </h1>
              <div className="flex items-center gap-6 text-white/60 font-bold uppercase tracking-widest text-[10px]">
                <div className="flex items-center gap-3">
                   <div className="relative h-8 w-8 rounded-full overflow-hidden border border-white/20">
                      <Image 
                        src={page.properties.author.created_by.avatar_url || "/placeholder.jpg"} 
                        alt="Author" 
                        fill 
                        className="object-cover" 
                      />
                   </div>
                   <span>{page.properties.author.created_by.name}</span>
                </div>
                <span>•</span>
                <span>{EuDateFormat(page.properties.published_date?.date?.start)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-invert prose-lg max-w-none">
            <NotionBlocks blocks={blocks} />
          </article>
        </div>
      </Container>
    </main>
  );
}
