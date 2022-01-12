import { NamedSet } from 'zustand/middleware';
import { GetState } from 'zustand';
import { MainNavSliceProps } from '../types';

export const createMainNavSlice = (
  set: NamedSet<MainNavSliceProps>,
  get: GetState<MainNavSliceProps>
): MainNavSliceProps => ({
  isDrawerOpened: false,
  setIsDrawerOpened: () =>
    set({ isDrawerOpened: !get().isDrawerOpened }, false, 'SET_OPEN_DRAWER'),
});
