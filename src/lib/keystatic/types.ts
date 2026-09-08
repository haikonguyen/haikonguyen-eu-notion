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

export enum ServiceIcon {
  Code = 'code',
  Camera = 'camera',
  Video = 'video',
}

export interface ServiceEntry {
  slug: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  ctaLabel: string;
  icon: ServiceIcon;
  contactServiceId: string;
  sortOrder: number;
}

export interface HomeAboutEntry {
  name: string;
  role: string;
  bio: string;
  portraitImage: string;
  ctaHref: string;
}

export enum CvSkillIcon {
  React = 'react',
  Typescript = 'typescript',
  Tailwind = 'tailwind',
  Node = 'node',
  Postgres = 'postgres',
  Photo = 'photo',
}

export interface CvSkillEntry {
  label: string;
  level: number;
  icon: CvSkillIcon;
}

export interface CvExperienceEntry {
  role: string;
  company: string;
  period: string;
  description: string;
  tech: string[];
}

export interface AboutCvEntry {
  pdfUrl?: string;
  skills: CvSkillEntry[];
  educationDegree: string;
  educationUniversity: string;
  educationFocus: string;
  experiences: CvExperienceEntry[];
}

export interface HomeFeaturedShowcase {
  photography?: PhotographyItemEntry;
  vlog?: PortfolioVlogEntry;
  software?: SoftwareProjectEntry;
}
