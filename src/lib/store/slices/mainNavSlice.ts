import { StateCreator } from 'zustand';
import { MainNavSliceProps } from '../types';

export const createMainNavSlice: StateCreator<
  MainNavSliceProps,
  [],
  [],
  MainNavSliceProps
> = (set, get) => ({
  isDrawerOpened: false,
  isSettingsEnabled: false,
  setIsDrawerOpened: () =>
    set({ isDrawerOpened: !get().isDrawerOpened }, false),
  setIsSettingsEnabled: () =>
    set({ isSettingsEnabled: !get().isSettingsEnabled }, false),
});
