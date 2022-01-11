import { NamedSet } from 'zustand/middleware';
import { GetState } from 'zustand';
import { BSliceProps } from '../types';

export const createBSlice = (
  set: NamedSet<BSliceProps>,
  get: GetState<BSliceProps>
): BSliceProps => ({
  bState: 'light',
  setBMode: () =>
    set(
      {
        bState: get().bState === 'dark' ? 'light' : 'dark',
      },
      false,
      'SET_PALETTE_MODE'
    ),
});
