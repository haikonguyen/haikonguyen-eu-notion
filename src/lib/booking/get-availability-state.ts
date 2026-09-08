import dayjs from 'dayjs';
import {
  buildDaySlots,
  formatBookingMonthLabel,
  getBookingWeekDays,
  shiftBookingWeek,
} from './availability';
import type { BookingDay, BookingSlot } from './constants';
import { fetchBusyRanges } from './google-calendar';

export interface BookingAvailabilityState {
  weekStartIso: string;
  monthLabel: string;
  previousWeekIso: string;
  nextWeekIso: string;
  days: BookingDay[];
  selectedDateIso: string;
  slots: BookingSlot[];
}

export async function getBookingAvailabilityState(
  weekParam?: string | null,
  dateParam?: string | null,
): Promise<BookingAvailabilityState | null> {
  const weekDays = getBookingWeekDays(weekParam ?? undefined);
  const weekStartIso = weekDays[0]?.dateIso;
  const selectedDateIso =
    dateParam && weekDays.some((day) => day.dateIso === dateParam)
      ? dateParam
      : weekDays[0]?.dateIso;

  if (!weekStartIso || !selectedDateIso) {
    return null;
  }

  const dayStart = dayjs(selectedDateIso).startOf('day').toISOString();
  const dayEnd = dayjs(selectedDateIso).endOf('day').toISOString();
  const busy = await fetchBusyRanges(dayStart, dayEnd);
  const slots = buildDaySlots(selectedDateIso, busy);

  return {
    weekStartIso,
    monthLabel: formatBookingMonthLabel(weekStartIso),
    previousWeekIso: shiftBookingWeek(weekStartIso, -1),
    nextWeekIso: shiftBookingWeek(weekStartIso, 1),
    days: weekDays,
    selectedDateIso,
    slots,
  };
}
