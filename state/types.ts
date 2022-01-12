import { State } from 'zustand';
import { PaletteMode } from '@mui/material';

export interface PaletteModeSliceProps extends State {
  paletteMode: PaletteMode;
  setPaletteMode: () => void;
}

export type DrawerStateType = boolean;

export interface MainNavSliceProps extends State {
  isDrawerOpened: DrawerStateType;
  setIsDrawerOpened: () => void;
}
