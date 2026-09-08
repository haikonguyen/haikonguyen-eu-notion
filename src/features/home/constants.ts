import { BENTO_GRID_GAP_CLASS } from '@components/ui/BentoGrid';

export const HOME_PHOTOGRAPHY_BG =
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070';

export const HOME_VLOG_PLACEHOLDER =
  'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&q=80&w=2070';

export const HOME_BENTO_GRID_CLASS = `mx-auto max-w-6xl auto-rows-auto md:auto-rows-[30rem] ${BENTO_GRID_GAP_CLASS}`;

export const HOME_WEEKDAY_HEADER_KEYS = [
  'weekdaySu',
  'weekdayMo',
  'weekdayTu',
  'weekdayWe',
  'weekdayTh',
  'weekdayFr',
  'weekdaySa',
] as const;

export const HOME_WEEKDAY_KEYS = [
  'weekdayMon',
  'weekdayTue',
  'weekdayWed',
  'weekdayThu',
  'weekdayFri',
] as const;

export const HOME_BOOKING_DAY_CELL_CLASS =
  'flex h-11 w-full items-center justify-center rounded-xl border text-xs font-bold transition-all duration-300 sm:h-13 sm:rounded-2xl sm:text-sm';

export const HOME_BOOKING_DAY_SELECTED_CLASS =
  'scale-105 border-primary bg-primary font-extrabold text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]';

export const HOME_BOOKING_DAY_IDLE_CLASS =
  'border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:bg-white/10 hover:text-white';

export const HOME_BOOKING_SLOT_DISABLED_CLASS =
  'cursor-not-allowed border-white/5 bg-white/[0.02] text-white/25 hover:border-white/5 hover:bg-white/[0.02] hover:text-white/25 active:scale-100';

export const HOME_BOOKING_INPUT_CLASS =
  'rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder:text-white/30 outline-none focus:border-primary/50 focus:ring-0';
