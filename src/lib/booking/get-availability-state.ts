import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import {
  buildDaySlots,
  formatBookingMonthLabel,
  getBookingWeekDays,
  shiftBookingWeek,
} from './availability';
import {
  BOOKING_TIMEZONE,
  type BookingDay,
  type BookingSlot,
} from './constants';
import { fetchBusyRanges } from './google-calendar';

dayjs.extend(utc);
dayjs.extend(timezone);

export interface BookingAvailabilityState {
  weekStartIso: string;
  monthLabel: string;
  previousWeekIso: string;
  nextWeekIso: string;
  days: BookingDay[];
  selectedDateIso: string;
  slots: BookingSlot[];
}

function pickDefaultSelectedDate(weekDays: BookingDay[]): string | undefined {
  const todayIso = dayjs().tz(BOOKING_TIMEZONE).format('YYYY-MM-DD');
  const todayInWeek = weekDays.find((day) => day.dateIso === todayIso);
  if (todayInWeek) {
    return todayInWeek.dateIso;
  }

  const nextFutureDay = weekDays.find((day) => day.dateIso > todayIso);
  return nextFutureDay?.dateIso ?? weekDays[0]?.dateIso;
}

export async function getBookingAvailabilityState(
  weekParam?: string | null,
  dateParam?: string | null,
): Promise<BookingAvailabilityState | null> {
  let weekDays = getBookingWeekDays(weekParam ?? undefined);

  // On first load (no explicit week), skip fully past Mon–Fri weeks (e.g. Sat/Sun).
  if (!weekParam && weekDays[0]) {
    const todayIso = dayjs().tz(BOOKING_TIMEZONE).format('YYYY-MM-DD');
    const hasUpcomingDay = weekDays.some((day) => day.dateIso >= todayIso);
    if (!hasUpcomingDay) {
      weekDays = getBookingWeekDays(shiftBookingWeek(weekDays[0].dateIso, 1));
    }
  }

  const weekStartIso = weekDays[0]?.dateIso;
  const selectedDateIso =
    dateParam && weekDays.some((day) => day.dateIso === dateParam)
      ? dateParam
      : pickDefaultSelectedDate(weekDays);

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
