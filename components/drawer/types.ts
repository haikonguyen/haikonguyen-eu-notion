import { NextRouter } from 'next/router';
import { DrawerStateType } from '@state/types';
import { Anchor } from '../navbar/types';

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

export interface NavLinkProps {
  id: string;
  label: string;
  url: string;
}

export interface TemporaryDrawerProps {
  anchor: Anchor;
  drawerItems: NavLinkProps[];
}

export interface DrawerItemListProps {
  anchor: Anchor;
  drawerItems: NavLinkProps[];
  hasLogo: boolean;
}
