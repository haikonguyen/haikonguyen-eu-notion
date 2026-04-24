"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import type { BlogPostType } from "@app-types/notion";

interface BlogSectionProps {
  posts: BlogPostType[];
}

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
      duration: 0.5,
    },
  },
};

function getCoverUrl(cover: BlogPostType["cover"]): string | null {
  if (!cover) return null;
  if (cover.type === "external") return cover.external.url;
  if (cover.type === "file") return cover.file.url;
  return null;
}

function getSlug(post: BlogPostType): string {
  const slugProperty = post.properties.slug;
  if (slugProperty?.rich_text?.[0]?.plain_text) {
    return slugProperty.rich_text[0].plain_text;
  }
  return post.id;
}

export function BlogSection({ posts }: BlogSectionProps) {
  const latestPosts = posts.slice(0, 3);

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Latest Articles
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Thoughts on React, Next.js, full-stack development, and everything in between
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {latestPosts.map((post, index) => {
            const title = post.properties.post_name?.title?.[0]?.plain_text || "Untitled";
            const excerpt = post.properties.excerpt?.rich_text?.[0]?.plain_text;
            const tags = post.properties.tags?.multi_select || [];
            const date = post.properties.published_date?.date?.start;
            const coverUrl = getCoverUrl(post.cover);
            const slug = getSlug(post);

            return (
              <motion.div key={post.id} variants={itemVariants}>
                <Link href={`/post/${slug}`}>
                  <Card className="group h-full overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      {coverUrl ? (
                        <img
                          src={coverUrl}
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <span className="text-4xl font-bold text-primary/30">
                            {index + 1}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                      {tags.length > 0 && (
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                            {tags[0].name}
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {title}
                      </h3>
                      {excerpt && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        {date && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {new Date(date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>5 min read</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" asChild>
            <Link href="/blog">
              View All Articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
