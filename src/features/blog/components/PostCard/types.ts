export interface PostCardProps {
  slug: string;
  title: string;
  excerpt: string;
  publishedDate: string | null;
  authorName: string;
  coverImage: string;
  tags: string[];
}

export enum CoverFallback {
  Image = '/assets/images/blogPageBgOptimized.jpg',
  Avatar = '/assets/images/heroProfileImg.png',
}
