"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getCoverSource } from "./utils";
import { PostCardProps } from "./types";
import { EuDateFormat } from "@lib/notion";

export default function PostCard({
  id,
  cover,
  properties,
  slug,
}: PostCardProps) {
  const postUrl = slug || id;
  const title = properties.post_name.title[0]?.plain_text || "Untitled";
  const excerpt = properties.excerpt.rich_text[0]?.plain_text || "";
  const author = properties.author.created_by;
  const date = properties.published_date.date?.start;
  const tags = properties.tags.multi_select;
  const coverSrc = getCoverSource(cover);

  return (
    <Link href={`/post/${postUrl}`}>
      <Card className="group h-full overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
        {/* Cover Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={coverSrc}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          
          {/* Tags overlay */}
          {tags.length > 0 && (
            <div className="absolute top-4 left-4 flex gap-2">
              {tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag.id}
                  variant="secondary"
                  className="bg-background/80 backdrop-blur-sm text-xs"
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Author and Date */}
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src={author.avatar_url} alt={author.name} />
              <AvatarFallback className="text-xs">
                {author.name?.split(" ").map((n) => n[0]).join("") || "HN"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">
                {author.name}
              </span>
              {date && (
                <span className="text-xs text-muted-foreground">
                  {EuDateFormat(date)}
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
              {excerpt}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              {date && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>5 min</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary group-hover:translate-x-1 transition-transform"
            >
              Read
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}
