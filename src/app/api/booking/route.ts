import { createCalendarEvent } from '@lib/booking';
import { NextResponse } from 'next/server';
import { z } from 'zod';

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

  const result = await createCalendarEvent({
    startIso,
    endIso,
    attendeeEmail: email,
    attendeeName: name,
    summary: `Call with ${name}`,
  });

  return NextResponse.json({
    ok: true,
    mode: result.mode,
    eventId: result.eventId,
  });
}
