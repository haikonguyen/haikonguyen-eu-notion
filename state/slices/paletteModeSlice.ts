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
    ),
  setLightPaletteMode: () =>
    set(
      {
        paletteMode: 'light',
      },
      false,
    ),
});
