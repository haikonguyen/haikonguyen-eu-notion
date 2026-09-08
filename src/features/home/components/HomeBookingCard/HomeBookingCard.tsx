'use client';

import { BentoGridItem } from '@components/ui/BentoGrid';
import { useTranslations } from 'next-intl';
import { useHomeBooking } from '../../hooks/useHomeBooking';
import { HomeBookingConfirmForm } from './HomeBookingConfirmForm';
import { HomeBookingDayPicker } from './HomeBookingDayPicker';
import { HomeBookingSlotPicker } from './HomeBookingSlotPicker';
import { HomeBookingWeekNav } from './HomeBookingWeekNav';
import type { HomeBookingCardProps } from './types';

export function HomeBookingCard({ initial }: HomeBookingCardProps) {
  const t = useTranslations('Home');
  const booking = useHomeBooking(initial);

  return (
    <BentoGridItem
      className="md:col-span-1"
      showGlow
      title={t('bookACallTitle')}
      header={
        <div className="flex h-full flex-col gap-5 pt-1 sm:gap-6 sm:pt-4">
          <div className="flex flex-col gap-3">
            <HomeBookingWeekNav
              monthLabel={booking.monthLabel}
              onShiftWeek={booking.shiftWeek}
            />
            <HomeBookingDayPicker
              days={booking.days}
              selectedDateIso={booking.selectedDateIso}
              onSelectDate={booking.selectDate}
            />
          </div>
          <HomeBookingSlotPicker
            slots={booking.slots}
            selectedSlotIso={booking.selectedSlotIso}
            onSelectSlot={booking.selectSlot}
          />
          <HomeBookingConfirmForm
            isSubmitting={booking.isSubmitting}
            statusMessage={booking.statusMessage}
            onConfirm={booking.confirmBooking}
          />
        </div>
      }
    />
  );
}
