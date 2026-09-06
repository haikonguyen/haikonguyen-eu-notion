'use client';

import type { BlogPostSummary } from '@lib/keystatic';
import { PostCard } from '../PostCard';

interface PostListProps {
  blogPostList: BlogPostSummary[];
}

const PostList = ({ blogPostList }: PostListProps) => {
  return (
    <div className="grid grid-cols-1 gap-8 pb-12 md:grid-cols-2 lg:grid-cols-3">
      {blogPostList.map((post) => (
        <PostCard
          key={post.slug}
          slug={post.slug}
          title={post.title}
          excerpt={post.excerpt}
          publishedDate={post.publishedDate}
          authorName={post.authorName}
          coverImage={post.coverImage}
          tags={post.tags}
        />
      ))}
    </div>
  );
};

export default PostList;
