import {
  buildDaySlots,
  createCalendarEvent,
  fetchBusyRanges,
} from '@lib/booking';
import { BOOKING_TIMEZONE } from '@lib/booking/constants';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { NextResponse } from 'next/server';
import { z } from 'zod';

dayjs.extend(utc);
dayjs.extend(timezone);

const bookingSchema = z.object({
  startIso: z.string().datetime(),
  endIso: z.string().datetime(),
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid booking payload' },
      { status: 400 },
    );
  }

  const { startIso, endIso, name, email } = parsed.data;
  if (new Date(endIso).getTime() <= new Date(startIso).getTime()) {
    return NextResponse.json({ error: 'Invalid time range' }, { status: 400 });
  }

  const start = dayjs(startIso).tz(BOOKING_TIMEZONE);
  const dateIso = start.format('YYYY-MM-DD');
  const weekday = start.day();
  if (weekday === 0 || weekday === 6) {
    return NextResponse.json(
      { error: 'Bookings are only available Monday to Friday' },
      { status: 400 },
    );
  }

  const dayStart = start.startOf('day').toISOString();
  const dayEnd = start.endOf('day').toISOString();
  const busy = await fetchBusyRanges(dayStart, dayEnd);
  const slots = buildDaySlots(dateIso, busy);
  const matchingSlot = slots.find(
    (slot) =>
      slot.startIso === startIso && slot.endIso === endIso && slot.isAvailable,
  );

  if (!matchingSlot) {
    return NextResponse.json(
      { error: 'Selected slot is unavailable' },
      { status: 409 },
    );
  }

  const result = await createCalendarEvent({
    startIso,
    endIso,
    attendeeEmail: email,
    attendeeName: name,
    summary: `Call with ${name}`,
  });

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error || 'Booking failed' },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    mode: result.mode,
    eventId: result.eventId,
  });
}
