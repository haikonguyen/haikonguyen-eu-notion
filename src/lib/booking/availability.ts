import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import {
  BOOKING_DURATION_MINUTES,
  BOOKING_SLOT_HOURS,
  BOOKING_SLOT_MINUTES,
  BOOKING_TIMEZONE,
  BOOKING_WEEKDAY_COUNT,
  type BookingDay,
  type BookingSlot,
} from './constants';

dayjs.extend(utc);
dayjs.extend(timezone);

function startOfWeekMonday(anchor: dayjs.Dayjs): dayjs.Dayjs {
  const day = anchor.day();
  const diff = day === 0 ? -6 : 1 - day;
  return anchor.add(diff, 'day').startOf('day');
}

export function getBookingWeekDays(anchorIso?: string): BookingDay[] {
  const anchor = anchorIso
    ? dayjs.tz(anchorIso, BOOKING_TIMEZONE)
    : dayjs().tz(BOOKING_TIMEZONE);
  const monday = startOfWeekMonday(anchor);

  return Array.from({ length: BOOKING_WEEKDAY_COUNT }, (_, index) => {
    const date = monday.add(index, 'day');
    return {
      dateIso: date.format('YYYY-MM-DD'),
      dayOfMonth: date.date(),
      weekdayIndex: index,
    };
  });
}

export function shiftBookingWeek(
  weekStartIso: string,
  direction: -1 | 1,
): string {
  return dayjs
    .tz(weekStartIso, BOOKING_TIMEZONE)
    .add(direction * 7, 'day')
    .format('YYYY-MM-DD');
}

export function formatBookingMonthLabel(weekStartIso: string): string {
  return dayjs.tz(weekStartIso, BOOKING_TIMEZONE).format('MMMM YYYY');
}

export function buildDaySlots(
  dateIso: string,
  busyRanges: Array<{ start: string; end: string }> = [],
): BookingSlot[] {
  const now = dayjs().tz(BOOKING_TIMEZONE);

  return BOOKING_SLOT_HOURS.map((hour, index) => {
    const minute = BOOKING_SLOT_MINUTES[index] ?? 0;
    const start = dayjs.tz(
      `${dateIso} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
      BOOKING_TIMEZONE,
    );
    const end = start.add(BOOKING_DURATION_MINUTES, 'minute');
    const overlapsBusy = busyRanges.some((range) => {
      const busyStart = dayjs(range.start);
      const busyEnd = dayjs(range.end);
      return start.isBefore(busyEnd) && end.isAfter(busyStart);
    });

    return {
      startIso: start.toISOString(),
      endIso: end.toISOString(),
      label: start.format('h:mm A'),
      isAvailable: start.isAfter(now) && !overlapsBusy,
    };
  });
}
