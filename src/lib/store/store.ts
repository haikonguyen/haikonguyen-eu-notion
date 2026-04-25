import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createToastSlice } from './slices';
import { StoreProps } from './types';

const useStore = create<StoreProps>()(
  devtools((...a) => ({
    ...createToastSlice(...a),
  })),
);

export default useStore;
