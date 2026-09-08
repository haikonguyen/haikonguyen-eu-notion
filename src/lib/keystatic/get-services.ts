import { cache } from 'react';
import type { AppLocale } from '../../../i18n/locale';
import { pickLocalized, pickLocalizedTitle } from './localized';
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

export const getServices = cache(
  async (locale: AppLocale): Promise<ServiceEntry[]> => {
    const entries = await reader.collections.services.all();

    return entries
      .map(({ slug, entry }) => ({
        slug,
        title: pickLocalizedTitle(entry.title, entry.titleI18n, locale),
        category: pickLocalized(entry.category, locale),
        description: pickLocalized(entry.description, locale),
        highlights: entry.highlights.map((item) => pickLocalized(item, locale)),
        ctaLabel: pickLocalized(entry.ctaLabel, locale),
        icon: toServiceIcon(entry.icon),
        contactServiceId:
          optionalCmsUrl(entry.contactServiceId)?.trim() || slug,
        sortOrder: entry.sortOrder ?? 0,
      }))
      .sort(compareSortOrderThenTitle);
  },
);
