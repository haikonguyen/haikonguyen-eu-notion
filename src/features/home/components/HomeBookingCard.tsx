'use client';

import { BentoGridItem } from '@components/ui/BentoGrid';
import type { BookingAvailabilityState } from '@lib/booking/get-availability-state';
import { cn } from '@lib/utils';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { HOME_WEEKDAY_HEADER_KEYS, HOME_WEEKDAY_KEYS } from '../constants';
import { useHomeBooking } from '../hooks/useHomeBooking';

export function HomeBookingCard({
  initial,
}: {
  initial: BookingAvailabilityState;
}) {
  const t = useTranslations('Home');
  const booking = useHomeBooking(initial);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <BentoGridItem
      className="md:col-span-1"
      showGlow
      title={t('bookACallTitle')}
      header={
        <div className="flex h-full flex-col gap-5 pt-1 sm:gap-6 sm:pt-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-base font-bold tracking-tight text-white sm:text-lg">
                {booking.monthLabel || t('calendarMonth')}
              </span>
              <div className="flex gap-4">
                <button
                  type="button"
                  aria-label={t('previousWeek')}
                  onClick={() => booking.shiftWeek(-1)}
                  className="text-white/50 transition-colors hover:text-primary"
                >
                  <FaChevronLeft className="text-xs sm:text-sm" />
                </button>
                <button
                  type="button"
                  aria-label={t('nextWeek')}
                  onClick={() => booking.shiftWeek(1)}
                  className="text-white/50 transition-colors hover:text-primary"
                >
                  <FaChevronRight className="text-xs sm:text-sm" />
                </button>
              </div>
            </div>
            <div className="mb-1 grid grid-cols-7 gap-1 text-center text-[9px] font-bold tracking-widest text-white/30 uppercase sm:text-[10px]">
              {HOME_WEEKDAY_HEADER_KEYS.map((key) => (
                <span key={key}>{t(key)}</span>
              ))}
            </div>
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5">
              {booking.days.map((day) => (
                <button
                  key={day.dateIso}
                  type="button"
                  onClick={() => booking.selectDate(day.dateIso)}
                  className="flex flex-col items-center gap-1.5"
                >
                  <span className="text-[9px] font-bold tracking-widest text-white/30 uppercase sm:text-[10px]">
                    {t(HOME_WEEKDAY_KEYS[day.weekdayIndex])}
                  </span>
                  <span
                    className={cn(
                      'flex h-11 w-full items-center justify-center rounded-xl border text-xs font-bold transition-all duration-300 sm:h-13 sm:rounded-2xl sm:text-sm',
                      day.dateIso === booking.selectedDateIso
                        ? 'scale-105 border-primary bg-primary font-extrabold text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                        : 'border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:bg-white/10 hover:text-white',
                    )}
                  >
                    {day.dayOfMonth}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <span className="ml-1 text-[10px] font-bold tracking-[0.25em] text-primary uppercase opacity-90 sm:text-[11px]">
              {t('selectSlot')}
            </span>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {booking.slots.map((slot) => (
                <button
                  key={slot.startIso}
                  type="button"
                  disabled={!slot.isAvailable}
                  onClick={() => booking.selectSlot(slot.startIso)}
                  className={cn(
                    'rounded-xl border px-2 py-2.5 text-center text-[10px] font-bold backdrop-blur-md transition-all sm:rounded-2xl sm:px-4 sm:py-3.5 sm:text-[11px]',
                    slot.startIso === booking.selectedSlotIso
                      ? 'border-primary bg-primary text-black'
                      : slot.isAvailable
                        ? 'border-white/10 bg-white/5 text-white/60 hover:border-primary/50 hover:bg-white/10 hover:text-white active:scale-95'
                        : 'cursor-not-allowed border-white/5 bg-white/[0.02] text-white/25',
                  )}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-auto space-y-2">
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={t('bookingNamePlaceholder')}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder:text-white/30 outline-none focus:border-primary/50"
            />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t('bookingEmailPlaceholder')}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder:text-white/30 outline-none focus:border-primary/50"
            />
            {booking.statusMessage ? (
              <p className="text-[10px] text-primary/90">
                {booking.statusMessage}
              </p>
            ) : null}
            <button
              type="button"
              disabled={booking.isSubmitting}
              onClick={() => booking.confirmBooking(name, email)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-[11px] font-bold tracking-[0.25em] text-black uppercase shadow-[0_15px_30px_-5px_rgba(6,182,212,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 sm:rounded-2xl sm:py-4 sm:text-xs"
            >
              <span>
                {booking.isSubmitting
                  ? t('bookingSubmitting')
                  : t('confirmBooking')}
              </span>
              <FaCalendarAlt className="text-xs opacity-70" />
            </button>
          </div>
        </div>
      }
    />
  );
}
