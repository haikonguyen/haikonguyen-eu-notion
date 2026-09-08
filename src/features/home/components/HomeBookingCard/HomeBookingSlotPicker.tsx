import { Button, ButtonSize, ButtonVariant } from '@components/ui/Button';
import { cn } from '@lib/utils';
import { useTranslations } from 'next-intl';
import { HOME_BOOKING_SLOT_DISABLED_CLASS } from '../../constants';
import type { HomeBookingSlotPickerProps } from './types';

function getSlotButtonClass(isSelected: boolean, isAvailable: boolean) {
  if (!isAvailable) {
    return HOME_BOOKING_SLOT_DISABLED_CLASS;
  }
  if (isSelected) {
    return 'border-primary bg-primary text-black hover:border-primary hover:bg-primary hover:text-black';
  }
  return undefined;
}

export function HomeBookingSlotPicker({
  slots,
  selectedSlotIso,
  onSelectSlot,
}: HomeBookingSlotPickerProps) {
  const t = useTranslations('Home');

  return (
    <div className="flex flex-col gap-3">
      <span className="ml-1 text-[10px] font-bold tracking-[0.25em] text-primary uppercase opacity-90 sm:text-[11px]">
        {t('selectSlot')}
      </span>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {slots.map((slot) => {
          const isSelected = slot.startIso === selectedSlotIso;

          return (
            <Button
              key={slot.startIso}
              variant={ButtonVariant.Soft}
              size={ButtonSize.Sm}
              disabled={!slot.isAvailable}
              onClick={() => onSelectSlot(slot.startIso)}
              className={cn(
                'backdrop-blur-md',
                getSlotButtonClass(isSelected, slot.isAvailable),
              )}
            >
              {slot.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
