import { getR2PublicUrl } from '@lib/r2';
import { getYoutubeId, getYoutubeThumbnailUrl } from '@lib/youtube';
import { cache } from 'react';
import type { AppLocale } from '../../../i18n/locale';
import { pickLocalized, pickLocalizedTitle } from './localized';
import { compareSortOrderThenTitle, optionalCmsUrl } from './portfolio-utils';
import { reader } from './reader';
import type { PortfolioVlogEntry } from './types';

export const getPortfolioVlogs = cache(
  async (locale: AppLocale): Promise<PortfolioVlogEntry[]> => {
    const entries = await reader.collections.portfolioVlogs.all();

    return entries
      .map(({ slug, entry }) => {
        const youtubeUrl = entry.youtubeUrl.trim();
        const youtubeId = getYoutubeId(youtubeUrl) ?? '';
        const thumbnailOverride = optionalCmsUrl(entry.thumbnail);

        return {
          slug,
          title: pickLocalizedTitle(entry.title, entry.titleI18n, locale),
          description: pickLocalized(entry.description, locale),
          youtubeUrl,
          youtubeId,
          duration: optionalCmsUrl(entry.duration),
          thumbnail: thumbnailOverride
            ? getR2PublicUrl(thumbnailOverride)
            : youtubeId
              ? getYoutubeThumbnailUrl(youtubeId)
              : '',
          sortOrder: entry.sortOrder ?? 0,
          featured: Boolean(entry.featured),
        };
      })
      .filter((entry) => Boolean(entry.youtubeId))
      .sort(compareSortOrderThenTitle);
  },
);
