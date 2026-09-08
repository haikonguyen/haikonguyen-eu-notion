import { Button, ButtonVariant } from '@components/ui/Button';
import { cn } from '@lib/utils';
import { useTranslations } from 'next-intl';
import {
  HOME_BOOKING_DAY_CELL_CLASS,
  HOME_BOOKING_DAY_IDLE_CLASS,
  HOME_BOOKING_DAY_SELECTED_CLASS,
  HOME_WEEKDAY_HEADER_KEYS,
  HOME_WEEKDAY_KEYS,
} from '../../constants';
import type { HomeBookingDayPickerProps } from './types';

export function HomeBookingDayPicker({
  days,
  selectedDateIso,
  onSelectDate,
}: HomeBookingDayPickerProps) {
  const t = useTranslations('Home');

  return (
    <div className="flex flex-col gap-3">
      <div className="mb-1 grid grid-cols-7 gap-1 text-center text-[9px] font-bold tracking-widest text-white/30 uppercase sm:text-[10px]">
        {HOME_WEEKDAY_HEADER_KEYS.map((key) => (
          <span key={key}>{t(key)}</span>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5">
        {days.map((day) => {
          const isSelected = day.dateIso === selectedDateIso;

          return (
            <Button
              key={day.dateIso}
              variant={ButtonVariant.Unstyled}
              onClick={() => onSelectDate(day.dateIso)}
              className="flex flex-col items-center gap-1.5"
            >
              <span className="text-[9px] font-bold tracking-widest text-white/30 uppercase sm:text-[10px]">
                {t(HOME_WEEKDAY_KEYS[day.weekdayIndex])}
              </span>
              <span
                className={cn(
                  HOME_BOOKING_DAY_CELL_CLASS,
                  isSelected
                    ? HOME_BOOKING_DAY_SELECTED_CLASS
                    : HOME_BOOKING_DAY_IDLE_CLASS,
                )}
              >
                {day.dayOfMonth}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
