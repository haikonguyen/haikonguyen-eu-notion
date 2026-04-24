"use client";

import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { PostList } from "@features/blog";
import { BlogPostType } from "@app-types/notion";

interface BlogSearchProps {
  blogPostList: BlogPostType[];
}

export function BlogSearch({ blogPostList }: BlogSearchProps) {
  const [searchField, setSearchField] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    blogPostList?.forEach((post) => {
      post.properties.tags?.multi_select?.forEach((tag) => {
        tagSet.add(tag.name);
      });
    });
    return Array.from(tagSet).sort();
  }, [blogPostList]);

  // Filter posts based on search and tag
  const filteredPosts = useMemo(() => {
    return blogPostList?.filter((post) => {
      const title =
        post.properties.post_name?.title?.[0]?.plain_text?.trim() ?? "";
      const excerpt =
        post.properties.excerpt?.rich_text?.[0]?.plain_text?.trim() ?? "";
      const postTags = post.properties.tags?.multi_select?.map((t) => t.name) ?? [];

      const matchesSearch =
        searchField === "" ||
        title.toLowerCase().includes(searchField.toLowerCase()) ||
        excerpt.toLowerCase().includes(searchField.toLowerCase());

      const matchesTag = !selectedTag || postTags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [blogPostList, searchField, selectedTag]);

  const clearFilters = () => {
    setSearchField("");
    setSelectedTag(null);
  };

  return (
    <div className="space-y-8">
      {/* Search and Filter Section */}
      <div className="space-y-6">
        {/* Search Input */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search articles..."
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            className="pl-10 bg-card/50 border-border/50 focus:border-primary"
          />
          {searchField && (
            <button
              onClick={() => setSearchField("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Tags Filter */}
        <div className="flex flex-wrap justify-center gap-2">
          <Badge
            variant={selectedTag === null ? "default" : "outline"}
            className="cursor-pointer transition-colors"
            onClick={() => setSelectedTag(null)}
          >
            All
          </Badge>
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              className="cursor-pointer transition-colors"
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Active Filters */}
        {(searchField || selectedTag) && (
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground">
              {filteredPosts?.length || 0} result{filteredPosts?.length !== 1 ? "s" : ""}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear filters
              <X className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>

      {/* Posts Grid */}
      <PostList blogPostList={filteredPosts} />
    </div>
  );
}
