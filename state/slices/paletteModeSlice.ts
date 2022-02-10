import { NamedSet } from 'zustand/middleware';
import { GetState } from 'zustand';
import { PaletteModeSliceProps } from '../types';

export const createPaletteModeSlice = (
  set: NamedSet<PaletteModeSliceProps>,
  get: GetState<PaletteModeSliceProps>
): PaletteModeSliceProps => ({
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
