import type { BookingAvailabilityState } from '@lib/booking/get-availability-state';
import type {
  HomeAboutEntry,
  PhotographyItemEntry,
  PortfolioVlogEntry,
  SoftwareProjectEntry,
} from '@lib/keystatic/types';

export interface HomePageContentProps {
  about: HomeAboutEntry;
  backgroundImage: string;
  photography?: PhotographyItemEntry;
  vlog?: PortfolioVlogEntry;
  software?: SoftwareProjectEntry;
  booking: BookingAvailabilityState;
}
