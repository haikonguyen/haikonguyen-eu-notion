import React from 'react';
import { BlogPostListType } from 'notion';
import { PostCard } from '../post-card';

const PostList = ({ blogPostList }: BlogPostListType) => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {blogPostList.map(({ id, cover, properties }) => (
        <PostCard id={id} key={id} cover={cover} properties={properties} />
      ))}
    </div>
  );
};

export default PostList;
