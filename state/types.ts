import { State } from 'zustand';
import { PaletteMode } from '@mui/material';

export interface PaletteModeSliceProps extends State {
  paletteMode: PaletteMode;
  setPaletteMode: () => void;
}

export interface BSliceProps extends State {
  bState: string;
  setBMode: () => void;
}
