import { HOME_PHOTOGRAPHY_BG, HomePageContent } from '@features/home';
import { getBookingAvailabilityState } from '@lib/booking';
import { getHomeAbout, getHomeFeaturedShowcase } from '@lib/keystatic';
import { getLocale } from 'next-intl/server';
import type { AppLocale } from '../../i18n/locale';

export default async function HomePage() {
  const locale = (await getLocale()) as AppLocale;
  const [about, featured, booking] = await Promise.all([
    getHomeAbout(),
    getHomeFeaturedShowcase(locale),
    getBookingAvailabilityState(),
  ]);

  if (!booking) {
    throw new Error('Failed to load booking availability');
  }

  return (
    <HomePageContent
      about={about}
      backgroundImage={featured.photography?.image || HOME_PHOTOGRAPHY_BG}
      photography={featured.photography}
      vlog={featured.vlog}
      software={featured.software}
      booking={booking}
    />
  );
}
