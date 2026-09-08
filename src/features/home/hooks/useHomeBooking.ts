'use client';

import type { BookingSlot } from '@lib/booking/constants';
import type { BookingAvailabilityState } from '@lib/booking/get-availability-state';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import type { HomeBookingFormValues } from '../create-home-booking-schema';

export function useHomeBooking(initial: BookingAvailabilityState) {
  const t = useTranslations('Home');
  const [state, setState] = useState(initial);
  const [selectedSlotIso, setSelectedSlotIso] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const loadAvailability = async (
    week?: string | null,
    date?: string | null,
  ) => {
    const params = new URLSearchParams();
    if (week) {
      params.set('week', week);
    }
    if (date) {
      params.set('date', date);
    }

    const response = await fetch(
      `/api/booking/availability?${params.toString()}`,
    );
    if (!response.ok) {
      return;
    }

    const payload = (await response.json()) as BookingAvailabilityState;
    setState(payload);
    setSelectedSlotIso(null);
  };

  const selectDate = (dateIso: string) => {
    void loadAvailability(state.weekStartIso, dateIso);
  };

  const shiftWeek = (direction: -1 | 1) => {
    const target = direction < 0 ? state.previousWeekIso : state.nextWeekIso;
    void loadAvailability(target, null);
  };

  const selectSlot = (startIso: string) => {
    setSelectedSlotIso(startIso);
    setStatusMessage(null);
  };

  const confirmBooking = async ({
    name,
    email,
  }: HomeBookingFormValues): Promise<boolean> => {
    const slot = state.slots.find(
      (item: BookingSlot) => item.startIso === selectedSlotIso,
    );
    if (!slot) {
      setStatusMessage(t('bookingSelectSlotError'));
      return false;
    }

    setIsSubmitting(true);
    setStatusMessage(null);
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startIso: slot.startIso,
          endIso: slot.endIso,
          name: name.trim(),
          email: email.trim(),
        }),
      });
      if (!response.ok) {
        setStatusMessage(t('bookingFailed'));
        return false;
      }
      const payload = (await response.json()) as { mode?: string };
      setStatusMessage(
        payload.mode === 'google'
          ? t('bookingSuccessGoogle')
          : t('bookingSuccessLocal'),
      );
      setSelectedSlotIso(null);
      void loadAvailability(state.weekStartIso, state.selectedDateIso);
      return true;
    } catch {
      setStatusMessage(t('bookingFailed'));
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    monthLabel: state.monthLabel,
    days: state.days,
    slots: state.slots,
    selectedDateIso: state.selectedDateIso,
    selectedSlotIso,
    isSubmitting,
    statusMessage,
    selectDate,
    selectSlot,
    shiftWeek,
    confirmBooking,
  };
}
