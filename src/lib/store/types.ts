import { ToastType } from '@config';

export interface ToastSliceProps {
  toastSettings: {
    isToastOpened: boolean;
    toastType: ToastType | undefined;
    toastMessage: string | undefined;
  };
  setToastSettings: (
    isToastOpened: boolean,
    toastType?: ToastType,
    toastMessage?: string,
  ) => void;
}

export type StoreProps = ToastSliceProps;
