export enum PortfolioCategory {
  All = 'All',
  Dev = 'Dev',
  Photo = 'Photo',
  Vlogs = 'Vlogs',
}

export interface SoftwareProject {
  slug: string;
  title: string;
  summary: string;
  longDescription: string;
  image: string;
  tags: string[];
  tech: string[];
  github?: string;
  demo?: string;
}

export interface PortfolioProject {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
  tech?: string[];
}

export interface PortfolioVlog {
  slug: string;
  title: string;
  description: string;
  duration?: string;
  thumbnail: string;
  youtubeId: string;
}

export interface PhotographyGalleryItem {
  slug: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
}
