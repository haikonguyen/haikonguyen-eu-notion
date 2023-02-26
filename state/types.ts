import { AlertColor, PaletteMode } from '@mui/material';

export interface PaletteModeSliceProps {
  paletteMode: PaletteMode | undefined;
  setDarkPaletteMode: () => void;
  setLightPaletteMode: () => void;
}

export type DrawerStateType = boolean;

export interface MainNavSliceProps {
  isDrawerOpened: DrawerStateType;
  isSettingsEnabled: DrawerStateType;
  setIsDrawerOpened: () => void;
  setIsSettingsEnabled: () => void;
}

export interface ToastSliceProps {
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
