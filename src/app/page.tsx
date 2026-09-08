import { HOME_PHOTOGRAPHY_BG, HomePageContent } from '@features/home';
import { getBookingAvailabilityState } from '@lib/booking';
import { getHomeAbout, getHomeFeaturedShowcase } from '@lib/keystatic';

export default async function HomePage() {
  const [about, featured, booking] = await Promise.all([
    getHomeAbout(),
    getHomeFeaturedShowcase(),
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
