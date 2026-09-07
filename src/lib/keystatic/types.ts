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

export interface SoftwareProjectEntry {
  slug: string;
  title: string;
  summary: string;
  longDescription: string;
  coverImage: string;
  tags: string[];
  tech: string[];
  githubUrl?: string;
  demoUrl?: string;
  sortOrder: number;
  featured: boolean;
}

export interface PhotographyItemEntry {
  slug: string;
  title: string;
  alt: string;
  image: string;
  width: number;
  height: number;
  sortOrder: number;
  featured: boolean;
}

export interface PortfolioVlogEntry {
  slug: string;
  title: string;
  description: string;
  youtubeUrl: string;
  youtubeId: string;
  duration?: string;
  thumbnail: string;
  sortOrder: number;
  featured: boolean;
}
