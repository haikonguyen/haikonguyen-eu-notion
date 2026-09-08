import { getBookingAvailabilityState } from '@lib/booking';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const state = await getBookingAvailabilityState(
    searchParams.get('week'),
    searchParams.get('date'),
  );

  if (!state) {
    return NextResponse.json({ error: 'Invalid week' }, { status: 400 });
  }

  return NextResponse.json(state);
}
