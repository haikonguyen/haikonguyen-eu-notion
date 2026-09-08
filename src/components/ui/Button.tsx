import { cn } from '@lib/utils';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export enum ButtonVariant {
  Primary = 'primary',
  Ghost = 'ghost',
  Soft = 'soft',
  Outline = 'outline',
  Unstyled = 'unstyled',
}

export enum ButtonSize {
  Sm = 'sm',
  Md = 'md',
  Lg = 'lg',
  Icon = 'icon',
}

const BUTTON_VARIANT_CLASS = {
  [ButtonVariant.Primary]:
    'bg-primary text-black shadow-[0_15px_30px_-5px_rgba(6,182,212,0.4)] hover:scale-[1.02] active:scale-[0.98]',
  [ButtonVariant.Ghost]:
    'bg-transparent text-white/50 hover:text-primary disabled:opacity-40',
  [ButtonVariant.Soft]:
    'border border-white/10 bg-white/5 text-white/60 hover:border-primary/50 hover:bg-white/10 hover:text-white active:scale-95',
  [ButtonVariant.Outline]:
    'border border-white/10 bg-transparent text-white/70 hover:border-white/25 hover:text-white',
  [ButtonVariant.Unstyled]: '',
} as const;

const BUTTON_SIZE_CLASS = {
  [ButtonSize.Sm]:
    'rounded-xl px-2 py-2.5 text-[10px] font-bold sm:rounded-2xl sm:px-4 sm:py-3.5 sm:text-[11px]',
  [ButtonSize.Md]: 'rounded-xl px-3 py-2.5 text-xs font-bold sm:rounded-2xl',
  [ButtonSize.Lg]:
    'rounded-xl px-4 py-3.5 text-[11px] font-bold tracking-[0.25em] uppercase sm:rounded-2xl sm:py-4 sm:text-xs',
  [ButtonSize.Icon]: 'inline-flex items-center justify-center',
} as const;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export function Button({
  variant = ButtonVariant.Soft,
  size = ButtonSize.Md,
  type = 'button',
  disabled,
  className,
  children,
  ...buttonProps
}: ButtonProps) {
  const isUnstyled = variant === ButtonVariant.Unstyled;

  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        !isUnstyled &&
          'inline-flex items-center justify-center gap-2 transition-all disabled:cursor-not-allowed disabled:opacity-60',
        BUTTON_VARIANT_CLASS[variant],
        !isUnstyled && BUTTON_SIZE_CLASS[size],
        className,
      )}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
