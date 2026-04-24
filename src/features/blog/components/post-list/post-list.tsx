'use client';

import { BlogPostListType, PropertiesType } from '@app-types/notion';
import { PostCard } from '../post-card';

const getPostSlug = (id: string, properties: PropertiesType): string => {
  const slugValue = properties?.slug?.rich_text?.[0]?.plain_text?.trim();
  return slugValue && slugValue.length > 0 ? slugValue : id;
};

const PostList = ({ blogPostList }: BlogPostListType) => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {blogPostList?.map(({ id, cover, properties }) => (
        <PostCard
          id={id}
          key={id}
          cover={cover}
          properties={properties}
          slug={getPostSlug(id, properties)}
        />
      ))}
    </div>
  );
};

export default PostList;
