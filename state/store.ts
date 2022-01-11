import create, { GetState } from 'zustand';
import { devtools, NamedSet, persist } from 'zustand/middleware';
import { createBSlice, createPaletteModeSlice } from '@state/slices';

const useStore = create(
  persist(
    devtools((set: NamedSet<any>, get: GetState<any>) => ({
      ...createPaletteModeSlice(set, get),
      ...createBSlice(set, get),
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
