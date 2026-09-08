import type { BookingDay, BookingSlot } from '@lib/booking/constants';
import type { BookingAvailabilityState } from '@lib/booking/get-availability-state';
import type { HomeBookingFormValues } from '../../create-home-booking-schema';

export interface HomeBookingCardProps {
  initial: BookingAvailabilityState;
}

export interface HomeBookingWeekNavProps {
  monthLabel: string;
  onShiftWeek: (direction: -1 | 1) => void;
}

export interface HomeBookingDayPickerProps {
  days: BookingDay[];
  selectedDateIso: string;
  onSelectDate: (dateIso: string) => void;
}

export interface HomeBookingSlotPickerProps {
  slots: BookingSlot[];
  selectedSlotIso: string | null;
  onSelectSlot: (startIso: string) => void;
}

export interface HomeBookingConfirmFormProps {
  isSubmitting: boolean;
  statusMessage: string | null;
  onConfirm: (values: HomeBookingFormValues) => Promise<boolean>;
}
