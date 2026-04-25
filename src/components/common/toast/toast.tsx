'use client';

import * as React from 'react';
import { useStore } from '@lib/store';
import { cn } from '@lib/utils';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

export const Toast = () => {
  const {
    toastSettings: { isToastOpened, toastMessage, toastType },
    setToastSettings,
  } = useStore();

  React.useEffect(() => {
    if (isToastOpened) {
      const timer = setTimeout(() => {
        setToastSettings(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isToastOpened, setToastSettings]);

  if (!isToastOpened) return null;

  const icons = {
    success: <FaCheckCircle className="text-green-500" />,
    error: <FaExclamationCircle className="text-red-500" />,
    warning: <FaExclamationCircle className="text-yellow-500" />,
    info: <FaInfoCircle className="text-blue-500" />,
  };

  const borderColors = {
    success: "border-green-500/20",
    error: "border-red-500/20",
    warning: "border-yellow-500/20",
    info: "border-blue-500/20",
  };

  return (
    <div className="fixed top-20 right-4 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
      <div className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-2xl bg-neutral-900 border backdrop-blur-xl shadow-2xl min-w-[300px]",
        borderColors[toastType as keyof typeof borderColors] || "border-white/10"
      )}>
        <div className="text-lg">
          {icons[toastType as keyof typeof icons] || icons.info}
        </div>
        <div className="flex-1 text-sm font-medium">
          {toastMessage}
        </div>
        <button 
          onClick={() => setToastSettings(false)}
          className="text-muted-foreground hover:text-white transition-colors"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};
