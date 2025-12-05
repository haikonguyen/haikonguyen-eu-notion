import { DrawerStateType } from '@lib/store';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export type Anchor = 'top' | 'left' | 'bottom' | 'right';
export type LogoOnClickHandlerType = (
  router: AppRouterInstance,
  isDrawerOpened: DrawerStateType,
  setIsDrawerOpened: () => void,
) => void;
