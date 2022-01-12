import { NextRouter } from 'next/router';
import { DrawerStateType } from '@state/types';
import { Anchor } from '@components/navbar/types';

export type ToggleDrawerType = (
  isDrawerOpened: DrawerStateType,
  setIsDrawerOpened: () => void
) => void;

export type ListItemClickHandlerType = (
  router: NextRouter,
  linkValue: string,
  isDrawerOpened: DrawerStateType,
  setIsDrawerOpened: () => void
) => void;

export interface TemporaryDrawerProps {
  anchor: Anchor;
  drawerItems: string[];
}

export interface DrawerItemListProps {
  anchor: Anchor;
  drawerItems: string[];
  hasLogo: boolean;
}
