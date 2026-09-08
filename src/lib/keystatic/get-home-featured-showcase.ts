import { cache } from 'react';
import type { AppLocale } from '../../../i18n/locale';
import { getPhotographyItems } from './get-photography-items';
import { getPortfolioVlogs } from './get-portfolio-vlogs';
import { getSoftwareProjects } from './get-software-projects';
import type { HomeFeaturedShowcase } from './types';

export const getHomeFeaturedShowcase = cache(
  async (locale: AppLocale): Promise<HomeFeaturedShowcase> => {
    const [photography, vlogs, software] = await Promise.all([
      getPhotographyItems(locale),
      getPortfolioVlogs(locale),
      getSoftwareProjects(locale),
    ]);

    return {
      photography: photography.find((item) => item.featured) ?? photography[0],
      vlog: vlogs.find((item) => item.featured) ?? vlogs[0],
      software: software.find((item) => item.featured) ?? software[0],
    };
  },
);
