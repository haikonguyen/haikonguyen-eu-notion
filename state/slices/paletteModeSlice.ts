import { StateCreator } from 'zustand';
import { PaletteModeSliceProps } from '../types';

export const createPaletteModeSlice: StateCreator<
  PaletteModeSliceProps,
  [],
  [],
  PaletteModeSliceProps
> = (set) => ({
  paletteMode: undefined,
  setDarkPaletteMode: () =>
    set(
      {
        paletteMode: 'dark',
      },
      false,
      'SET_DARK_PALETTE_MODE'
    ),
  setLightPaletteMode: () =>
    set(
      {
        paletteMode: 'light',
      },
      false,
      'SET_LIGHT_PALETTE_MODE'
    ),
});
