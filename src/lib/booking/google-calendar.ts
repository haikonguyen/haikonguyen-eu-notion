import { BOOKING_CALENDAR_ID, BOOKING_TIMEZONE } from './constants';
import { getGoogleAccessToken } from './google-access-token';

interface FreeBusyRange {
  start: string;
  end: string;
}

interface CreateEventInput {
  startIso: string;
  endIso: string;
  attendeeEmail: string;
  attendeeName: string;
  summary: string;
}

export type CreateCalendarEventResult =
  | { ok: true; eventId: string | null; mode: 'google' | 'local' }
  | { ok: false; error: string };

function hasGoogleCalendarConfig(): boolean {
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY &&
      process.env.GOOGLE_CALENDAR_ID,
  );
}

export function isGoogleCalendarConfigured(): boolean {
  return hasGoogleCalendarConfig();
}

function getCalendarId(): string {
  return process.env.GOOGLE_CALENDAR_ID || BOOKING_CALENDAR_ID;
}

async function getAccessToken(): Promise<string | null> {
  if (!hasGoogleCalendarConfig()) {
    return null;
  }

  return getGoogleAccessToken();
}

export async function fetchBusyRanges(
  timeMinIso: string,
  timeMaxIso: string,
): Promise<FreeBusyRange[]> {
  const token = await getAccessToken();
  if (!token) {
    return [];
  }

  const calendarId = getCalendarId();
  const response = await fetch(
    'https://www.googleapis.com/calendar/v3/freeBusy',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timeMin: timeMinIso,
        timeMax: timeMaxIso,
        timeZone: BOOKING_TIMEZONE,
        items: [{ id: calendarId }],
      }),
    },
  );

  if (!response.ok) {
    return [];
  }

  const payload = (await response.json()) as {
    calendars?: Record<string, { busy?: FreeBusyRange[] }>;
  };

  return payload.calendars?.[calendarId]?.busy ?? [];
}

export async function createCalendarEvent(
  input: CreateEventInput,
): Promise<CreateCalendarEventResult> {
  // Demo/local mode when Google Calendar is not configured.
  if (!hasGoogleCalendarConfig()) {
    return { ok: true, eventId: null, mode: 'local' };
  }

  const token = await getAccessToken();
  if (!token) {
    return {
      ok: false,
      error: 'Unable to authenticate with Google Calendar',
    };
  }

  const calendarId = getCalendarId();
  // Service accounts cannot invite attendees without domain-wide delegation.
  // Keep guest details in the description instead of sending `attendees`.
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        summary: input.summary,
        description: `Booked via haikonguyen.eu by ${input.attendeeName} <${input.attendeeEmail}>`,
        start: { dateTime: input.startIso, timeZone: BOOKING_TIMEZONE },
        end: { dateTime: input.endIso, timeZone: BOOKING_TIMEZONE },
      }),
    },
  );

  if (!response.ok) {
    return {
      ok: false,
      error: 'Google Calendar rejected the booking request',
    };
  }

  const payload = (await response.json()) as { id?: string };
  return { ok: true, eventId: payload.id ?? null, mode: 'google' };
}
