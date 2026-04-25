import type { BlogPage } from '@app-types/notion';

export function getImagekitPath(page: BlogPage): string | undefined {
  return page.properties.imagekit_path?.rich_text?.[0]?.plain_text;
}

export function getPostTitle(page: BlogPage, fallback: string): string {
  return page.properties.post_name.title?.[0]?.plain_text ?? fallback;
}

export function getPostExcerpt(page: BlogPage, fallback: string): string {
  return page.properties.excerpt.rich_text[0]?.plain_text ?? fallback;
}
