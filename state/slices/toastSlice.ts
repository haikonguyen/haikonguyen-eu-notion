import { NamedSet } from 'zustand/middleware';
import { GetState } from 'zustand';
import { ToastSliceProps } from '../types';

export const createToastSlice = (
  set: NamedSet<ToastSliceProps>,
  get: GetState<ToastSliceProps>
): ToastSliceProps => ({
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
