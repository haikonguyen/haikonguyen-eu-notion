import type { BlogPage } from '@app-types/notion';

export function getPageSlug(page: BlogPage): string {
  const slugProperty = page.properties.slug?.rich_text?.[0]?.plain_text?.trim();
  return slugProperty && slugProperty.length > 0 ? slugProperty : page.id;
}
