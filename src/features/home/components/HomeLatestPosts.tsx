'use client';

import { PostCard } from '@features/blog/components/PostCard';
import type { BlogPostSummary } from '@lib/keystatic/types';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export interface HomeLatestPostsProps {
  posts: BlogPostSummary[];
}

export function HomeLatestPosts({ posts }: HomeLatestPostsProps) {
  const t = useTranslations('Home');

  if (posts.length === 0) return null;

  return (
    <section className="space-y-5">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
            {t('whatsNewEyebrow')}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-foreground">
            {t('whatsNewTitle')}
          </h2>
        </div>
        <Link
          href="/blog"
          className="text-xs font-bold uppercase tracking-wider text-primary"
        >
          {t('readArticle')}
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} {...post} />
        ))}
      </div>
    </section>
  );
}
