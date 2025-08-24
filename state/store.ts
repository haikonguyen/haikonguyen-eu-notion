import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  createMainNavSlice,
  createPaletteModeSlice,
  createToastSlice,
} from '@state/slices';
import { StoreProps } from './types';

const useStore = create<StoreProps>()(
  persist(
    devtools((...a) => ({
      ...createMainNavSlice(...a),
      ...createToastSlice(...a),
      ...createPaletteModeSlice(...a),
    })),
    {
      name: 'PERSISTED_STATE',
      partialize: (state) => ({
        paletteMode: state.paletteMode,
      }),
    },
  ),
);

export default useStore;
