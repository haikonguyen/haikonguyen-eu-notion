export const BOOKING_TIMEZONE = 'Europe/Prague';
export const BOOKING_DURATION_MINUTES = 30;
export const BOOKING_WEEKDAY_COUNT = 5;
export const BOOKING_SLOT_HOURS = [9, 11, 14, 16] as const;
export const BOOKING_SLOT_MINUTES = [0, 30, 0, 30] as const;
export const BOOKING_CALENDAR_ID = 'primary';

export interface BookingSlot {
  startIso: string;
  endIso: string;
  label: string;
  isAvailable: boolean;
}

export interface BookingDay {
  dateIso: string;
  dayOfMonth: number;
  weekdayIndex: number;
}
