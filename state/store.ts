import { create, GetState } from 'zustand';
import { devtools, NamedSet, persist } from 'zustand/middleware';
import {
  createMainNavSlice,
  createPaletteModeSlice,
  createToastSlice,
} from '@state/slices';

const useStore = create(
  persist(
    devtools((set: NamedSet<any>, get: GetState<any>) => ({
      ...createMainNavSlice(set, get),
      ...createToastSlice(set, get),
      ...createPaletteModeSlice(set, get),
    })),
    {
      name: 'PERSISTED_STATE',
      partialize: (state) => ({
        paletteMode: state.paletteMode,
      }),
    }
  )
);

export default useStore;
