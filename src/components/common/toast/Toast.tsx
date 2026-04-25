'use client';

import { ToastType } from '@config';
import { useStore } from '@lib/store';
import { cn } from '@lib/utils';
import { useEffect } from 'react';
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimes,
} from 'react-icons/fa';

const TOAST_AUTO_DISMISS_MS = 5000;

const toastIcons = {
  [ToastType.Success]: <FaCheckCircle className="text-green-500" />,
  [ToastType.Error]: <FaExclamationCircle className="text-red-500" />,
  [ToastType.Warning]: <FaExclamationCircle className="text-yellow-500" />,
  [ToastType.Info]: <FaInfoCircle className="text-blue-500" />,
};

const toastBorderColors = {
  [ToastType.Success]: 'border-green-500/20',
  [ToastType.Error]: 'border-red-500/20',
  [ToastType.Warning]: 'border-yellow-500/20',
  [ToastType.Info]: 'border-blue-500/20',
};

export function Toast() {
  const {
    toastSettings: { isToastOpened, toastMessage, toastType },
    setToastSettings,
  } = useStore();

  useEffect(() => {
    if (!isToastOpened) return;

    const timer = setTimeout(() => {
      setToastSettings(false);
    }, TOAST_AUTO_DISMISS_MS);

    return () => clearTimeout(timer);
  }, [isToastOpened, setToastSettings]);

  if (!isToastOpened) return null;

  const resolvedType = toastType ?? ToastType.Info;

  return (
    <div className="fixed top-20 right-4 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
      <div
        className={cn(
          'flex min-w-[300px] items-center gap-3 rounded-2xl border bg-neutral-900 px-4 py-3 shadow-2xl backdrop-blur-xl',
          toastBorderColors[resolvedType],
        )}
      >
        <div className="text-lg">{toastIcons[resolvedType]}</div>
        <div className="flex-1 text-sm font-medium">{toastMessage}</div>
        <button
          type="button"
          onClick={() => setToastSettings(false)}
          className="text-muted-foreground transition-colors hover:text-white"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
}
