import type { Node as MarkdocNode } from '@markdoc/markdoc';

export interface BlogPostSummary {
  slug: string;
  title: string;
  publishedDate: string | null;
  excerpt: string;
  tags: string[];
  authorName: string;
  coverImage: string;
}

export interface BlogPost extends BlogPostSummary {
  content: MarkdocNode;
}

export interface AboutStory {
  content: MarkdocNode;
}
