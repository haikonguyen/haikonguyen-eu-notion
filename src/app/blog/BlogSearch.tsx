'use client';

import React, { useState } from 'react';
import { PostList } from '@features/blog';
import { BlogPostType } from '@app-types/notion';

interface BlogSearchProps {
  blogPostList: BlogPostType[];
}

export function BlogSearch({ blogPostList }: BlogSearchProps) {
  const [searchField, setSearchField] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(event.target.value);
  };

  const filteredPosts = blogPostList?.filter((post) => {
    const title =
      post.properties.post_name?.title?.[0]?.plain_text?.trim() ?? '';
    return title.toLowerCase().includes(searchField.toLowerCase());
  });

  return (
    <div className="space-y-12">
      <div className="flex justify-center">
        <div className="relative w-full max-w-xl group">
          <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          <input
            type="text"
            placeholder="Search articles, thoughts, experiments..."
            onChange={handleChange}
            className="relative w-full px-8 py-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-lg font-medium"
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 font-bold tracking-widest text-[10px] uppercase">
            Search
          </div>
        </div>
      </div>
      
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
        <PostList blogPostList={filteredPosts} />
      </div>
    </div>
  );
}
