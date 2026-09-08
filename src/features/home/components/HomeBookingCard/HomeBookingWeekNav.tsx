import { Button, ButtonSize, ButtonVariant } from '@components/ui/Button';
import { useTranslations } from 'next-intl';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import type { HomeBookingWeekNavProps } from './types';

export function HomeBookingWeekNav({
  monthLabel,
  onShiftWeek,
}: HomeBookingWeekNavProps) {
  const t = useTranslations('Home');

  return (
    <div className="flex items-center justify-between px-1">
      <span className="text-base font-bold tracking-tight text-white sm:text-lg">
        {monthLabel || t('calendarMonth')}
      </span>
      <div className="flex gap-4">
        <Button
          variant={ButtonVariant.Ghost}
          size={ButtonSize.Icon}
          aria-label={t('previousWeek')}
          onClick={() => onShiftWeek(-1)}
        >
          <FaChevronLeft className="text-xs sm:text-sm" />
        </Button>
        <Button
          variant={ButtonVariant.Ghost}
          size={ButtonSize.Icon}
          aria-label={t('nextWeek')}
          onClick={() => onShiftWeek(1)}
        >
          <FaChevronRight className="text-xs sm:text-sm" />
        </Button>
      </div>
    </div>
  );
}
