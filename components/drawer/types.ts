import { NextRouter } from 'next/router';
import { DrawerStateType } from '@state/types';
import { Anchor } from '../navbar/types';
import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/system';

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
  children: ReactNode;
  isSettingNav: boolean;
  isDrawerEnabled: boolean;
  onClick: () => void;
  onClose: () => void;
  sx?: SxProps<Theme> | undefined;
}

export interface DrawerItemListProps {
  anchor: Anchor;
  drawerItems: NavLinkProps[];
  hasLogo: boolean;
}
