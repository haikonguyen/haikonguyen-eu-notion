'use client';

import { PostList } from '@features/blog';
import type { BlogPostSummary } from '@lib/keystatic';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type ChangeEvent, useState } from 'react';

interface BlogSearchProps {
  blogPostList: BlogPostSummary[];
}

function matchesSearchQuery(post: BlogPostSummary, query: string): boolean {
  return post.title.toLowerCase().includes(query.toLowerCase());
}

export function BlogSearch({ blogPostList }: BlogSearchProps) {
  const t = useTranslations('Blog');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPostList.filter((post) =>
    matchesSearchQuery(post, searchQuery),
  );

  return (
    <div className="space-y-8 sm:space-y-12">
      <label className="relative block max-w-xl group">
        <span className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-white/40 transition-colors group-focus-within:text-primary"
        />
        <input
          type="search"
          value={searchQuery}
          placeholder={t('searchPlaceholder')}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(event.target.value)
          }
          className="relative w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm font-medium text-white shadow-md backdrop-blur-xl placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 sm:py-3.5 sm:text-base"
        />
      </label>

      <PostList blogPostList={filteredPosts} />
    </div>
  );
}
