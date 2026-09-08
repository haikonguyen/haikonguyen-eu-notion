import { cache } from 'react';
import { compareSortOrderThenTitle, optionalCmsUrl } from './portfolio-utils';
import { reader } from './reader';
import { type ServiceEntry, ServiceIcon } from './types';

function toServiceIcon(value: string): ServiceIcon {
  if (value === ServiceIcon.Camera) {
    return ServiceIcon.Camera;
  }
  if (value === ServiceIcon.Video) {
    return ServiceIcon.Video;
  }
  return ServiceIcon.Code;
}

export const getServices = cache(async (): Promise<ServiceEntry[]> => {
  const entries = await reader.collections.services.all();

  return entries
    .map(({ slug, entry }) => ({
      slug,
      title: entry.title,
      category: entry.category,
      description: entry.description,
      highlights: [...entry.highlights],
      ctaLabel: entry.ctaLabel,
      icon: toServiceIcon(entry.icon),
      contactServiceId: optionalCmsUrl(entry.contactServiceId)?.trim() || slug,
      sortOrder: entry.sortOrder ?? 0,
    }))
    .sort(compareSortOrderThenTitle);
});
