import { DrawerStateType } from '@state/types';
import { NextRouter } from 'next/router';

export type Anchor = 'top' | 'left' | 'bottom' | 'right';
export type LogoOnClickHandlerType = (
  router: NextRouter,
  isDrawerOpened: DrawerStateType,
  setIsDrawerOpened: () => void
) => void;
