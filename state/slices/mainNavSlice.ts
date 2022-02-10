import { NamedSet } from 'zustand/middleware';
import { GetState } from 'zustand';
import { MainNavSliceProps } from '../types';

export const createMainNavSlice = (
  set: NamedSet<MainNavSliceProps>,
  get: GetState<MainNavSliceProps>
): MainNavSliceProps => ({
  isDrawerOpened: false,
  isSettingsEnabled: false,
  setIsDrawerOpened: () =>
    set({ isDrawerOpened: !get().isDrawerOpened }, false, 'TOGGLE_MOBILE_NAV'),
  setIsSettingsEnabled: () =>
    set(
      { isSettingsEnabled: !get().isSettingsEnabled },
      false,
      'TOGGLE_SETTINGS_DRAWER'
    ),
});
