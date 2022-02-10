import { State } from 'zustand';
import { AlertColor, PaletteMode } from '@mui/material';

export interface PaletteModeSliceProps extends State {
  paletteMode: PaletteMode | undefined;
  setDarkPaletteMode: () => void;
  setLightPaletteMode: () => void;
}

export type DrawerStateType = boolean;

export interface MainNavSliceProps extends State {
  isDrawerOpened: DrawerStateType;
  isSettingsEnabled: DrawerStateType;
  setIsDrawerOpened: () => void;
  setIsSettingsEnabled: () => void;
}

export interface ToastSliceProps extends State {
  toastSettings: {
    isToastOpened: boolean;
    toastType: AlertColor | undefined;
    toastMessage: string | undefined;
  };
  setToastSettings: (
    isToastOpened: boolean,
    toastType?: AlertColor,
    toastMessage?: string
  ) => void;
}
