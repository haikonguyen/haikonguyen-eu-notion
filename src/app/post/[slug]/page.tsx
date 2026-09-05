import { AppPageShell, AppPageShellSize } from '@components/layout';
import { siteConfig } from '@config';
import { PostArticle } from '@features/blog/components/PostArticle';
import { CoverFallback } from '@features/blog/components/PostCard/types';
import { PostHero } from '@features/blog/components/PostHero';
import { getAllPosts, getPostBySlug } from '@lib/keystatic';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = await getTranslations('Metadata');
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: t('postNotFound') };
  }

  const title = post.title || t('postFallbackTitle');
  const description = post.excerpt || t('postFallbackDescription');
  const coverSrc = post.coverImage || CoverFallback.Image;
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
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const postTitle = post.title || t('untitledPost');
  const coverSrc = post.coverImage || CoverFallback.Image;

  return (
    <AppPageShell size={AppPageShellSize.Article}>
      <PostHero
        title={postTitle}
        excerpt={post.excerpt}
        authorName={post.authorName}
        publishedDate={post.publishedDate}
        coverSrc={coverSrc}
        tags={post.tags}
      />
      <PostArticle content={post.content} />
    </AppPageShell>
  );
}
