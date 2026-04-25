import type { BlogPage } from '@app-types/notion';
import { AppPageShell, AppPageShellSize } from '@components/layout';
import { siteConfig } from '@config';
import { getCoverSource } from '@features/blog';
import { PostArticle } from '@features/blog/components/PostArticle';
import { PostHero } from '@features/blog/components/PostHero';
import { getPageSlug } from '@features/blog/utils/get-page-slug';
import {
  getImagekitPath,
  getPostExcerpt,
  getPostTitle,
} from '@features/blog/utils/get-post-fields';
import {
  findBlogPageBySlug,
  getBlogDatabaseCached,
  getPostBlocks,
} from '@features/blog/utils/load-post';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

export const revalidate = 1;

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
  const t = await getTranslations('Metadata');
  const page = await findBlogPageBySlug(slug);

  if (!page) {
    return { title: t('postNotFound') };
  }

  const title = getPostTitle(page, t('postFallbackTitle'));
  const description = getPostExcerpt(page, t('postFallbackDescription'));
  const coverSrc = getCoverSource(page.cover, getImagekitPath(page));
  const absoluteImageUrl = coverSrc.startsWith('http')
    ? coverSrc
    : `${siteConfig.url}${coverSrc}`;

  return {
    title: t('postTitle', { title }),
    description,
    openGraph: {
      type: 'article',
      url: `${siteConfig.url}/post/${slug}`,
      title,
      description,
      siteName: t('blogSiteName'),
      images: [{ url: absoluteImageUrl, width: 1200, height: 630, alt: title }],
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

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = await getTranslations('Metadata');
  const page = await findBlogPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const blocks = await getPostBlocks(page.id);
  const postTitle = getPostTitle(page, t('untitledPost'));
  const coverSrc = getCoverSource(page.cover, getImagekitPath(page));

  return (
    <AppPageShell size={AppPageShellSize.Article}>
      <PostHero page={page} coverSrc={coverSrc} postTitle={postTitle} />
      <PostArticle blocks={blocks} />
    </AppPageShell>
  );
}
