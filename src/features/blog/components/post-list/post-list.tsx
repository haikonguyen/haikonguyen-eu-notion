"use client";

import { motion } from "framer-motion";
import { BlogPostListType, PropertiesType } from "@app-types/notion";
import { PostCard } from "../post-card";

const getPostSlug = (id: string, properties: PropertiesType): string => {
  const slugValue = properties?.slug?.rich_text?.[0]?.plain_text?.trim();
  return slugValue && slugValue.length > 0 ? slugValue : id;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

const PostList = ({ blogPostList }: BlogPostListType) => {
  if (!blogPostList || blogPostList.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No posts found.</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    >
      {blogPostList.map(({ id, cover, properties }) => (
        <motion.div key={id} variants={itemVariants}>
          <PostCard
            id={id}
            cover={cover}
            properties={properties}
            slug={getPostSlug(id, properties)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PostList;
