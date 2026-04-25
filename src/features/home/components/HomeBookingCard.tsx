'use client';

import { BentoGridItem } from '@components/ui/BentoGrid';
import { cn } from '@lib/utils';
import { useTranslations } from 'next-intl';
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import {
  HOME_CALENDAR_DAYS,
  HOME_SELECTED_DAY,
  HOME_TIME_SLOT_KEYS,
  HOME_WEEKDAY_HEADER_KEYS,
  HOME_WEEKDAY_KEYS,
} from '../constants';

export function HomeBookingCard() {
  const t = useTranslations('Home');

  return (
    <BentoGridItem
      className="md:col-span-1"
      showGlow
      title={t('bookACallTitle')}
      header={
        <div className="flex h-full flex-col gap-6 pt-1 sm:gap-8 sm:pt-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-base font-bold tracking-tight text-white sm:text-lg">
                {t('calendarMonth')}
              </span>
              <div className="flex gap-6 opacity-40">
                <FaChevronLeft className="text-xs transition-colors hover:text-primary sm:text-sm" />
                <FaChevronRight className="text-xs transition-colors hover:text-primary sm:text-sm" />
              </div>
            </div>
            <div className="mb-1 grid grid-cols-7 gap-1 text-center text-[9px] font-bold tracking-widest text-white/30 uppercase sm:text-[10px]">
              {HOME_WEEKDAY_HEADER_KEYS.map((key) => (
                <span key={key}>{t(key)}</span>
              ))}
            </div>
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5">
              {HOME_CALENDAR_DAYS.map((day, index) => (
                <div key={day} className="flex flex-col items-center gap-1.5">
                  <span className="text-[9px] font-bold tracking-widest text-white/30 uppercase sm:text-[10px]">
                    {t(HOME_WEEKDAY_KEYS[index])}
                  </span>
                  <div
                    className={cn(
                      'flex h-11 w-full items-center justify-center rounded-xl border text-xs font-bold transition-all duration-300 sm:h-13 sm:rounded-2xl sm:text-sm',
                      day === HOME_SELECTED_DAY
                        ? 'scale-105 border-primary bg-primary font-extrabold text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                        : 'border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:bg-white/10 hover:text-white',
                    )}
                  >
                    {day}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <span className="ml-1 text-[10px] font-bold tracking-[0.25em] text-primary uppercase opacity-90 sm:text-[11px]">
              {t('selectSlot')}
            </span>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {HOME_TIME_SLOT_KEYS.map((slotKey) => (
                <div
                  key={slotKey}
                  className="rounded-xl border border-white/10 bg-white/5 px-2 py-2.5 text-center text-[10px] font-bold text-white/60 backdrop-blur-md transition-all hover:border-primary/50 hover:bg-white/10 hover:text-white active:scale-95 sm:rounded-2xl sm:px-4 sm:py-3.5 sm:text-[11px]"
                >
                  {t(slotKey)}
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-[11px] font-bold tracking-[0.25em] text-black uppercase shadow-[0_15px_30px_-5px_rgba(6,182,212,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] sm:rounded-2xl sm:py-4 sm:text-xs"
          >
            <span>{t('confirmBooking')}</span>
            <FaCalendarAlt className="text-xs opacity-70" />
          </button>
        </div>
      }
    />
  );
}
