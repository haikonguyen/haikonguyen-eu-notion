import { BENTO_GRID_GAP_CLASS } from '@components/ui/BentoGrid';

export const HOME_PHOTOGRAPHY_BG =
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070';

export const HOME_VLOG_PLACEHOLDER =
  'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&q=80&w=2070';

export const HOME_BENTO_GRID_CLASS = `mx-auto max-w-6xl auto-rows-auto md:auto-rows-[30rem] ${BENTO_GRID_GAP_CLASS}`;

export const HOME_CALENDAR_DAYS = [13, 14, 15, 16, 17] as const;
export const HOME_SELECTED_DAY = 15;

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

export const HOME_TIME_SLOT_KEYS = [
  'slotMorning',
  'slotMidMorning',
  'slotAfternoon',
  'slotLateAfternoon',
] as const;
