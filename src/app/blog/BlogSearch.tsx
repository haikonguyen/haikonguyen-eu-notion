'use client';

import React, { useState } from 'react';
import { TextField } from '@mui/material';
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
    <>
      <section className="flex flex-wrap justify-center">
        <TextField
          id="outlined-search"
          label="🔍 search..."
          variant="outlined"
          onChange={handleChange}
        />
      </section>
      <section>
        <PostList blogPostList={filteredPosts} />
      </section>
    </>
  );
}
