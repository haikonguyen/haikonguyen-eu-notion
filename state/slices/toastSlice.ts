import { StateCreator } from 'zustand';
import { ToastSliceProps } from '../types';

export const createToastSlice: StateCreator<
  ToastSliceProps,
  [],
  [],
  ToastSliceProps
> = (set) => ({
  toastSettings: {
    isToastOpened: false,
    toastType: undefined,
    toastMessage: '',
  },
  setToastSettings: (isToastOpened, toastType, toastMessage) => {
    set(
      {
        toastSettings: {
          isToastOpened,
          toastType,
          toastMessage,
        },
      },
      false,
      'SET_TOAST_SETTINGS'
    );
  },
});
