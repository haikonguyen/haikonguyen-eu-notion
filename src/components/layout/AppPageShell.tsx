import { cn } from '@lib/utils';
import type { ReactNode } from 'react';

export enum AppPageShellSize {
  Default = 'Default',
  Article = 'Article',
  Auth = 'Auth',
  Cart = 'Cart',
  Checkout = 'Checkout',
  FullBleed = 'FullBleed',
}

interface AppPageShellProps {
  children: ReactNode;
  className?: string;
  size?: AppPageShellSize;
  fullBleed?: boolean;
}

const sizeClasses: Record<AppPageShellSize, string> = {
  [AppPageShellSize.Default]: 'max-w-7xl',
  [AppPageShellSize.Article]: 'max-w-4xl',
  [AppPageShellSize.Auth]: 'max-w-md',
  [AppPageShellSize.Cart]: 'max-w-2xl lg:max-w-3xl',
  [AppPageShellSize.Checkout]: 'max-w-5xl lg:max-w-6xl',
  [AppPageShellSize.FullBleed]: 'max-w-full',
};

const defaultShellClass =
  'mx-auto px-3 sm:px-6 lg:px-8 pt-[calc(env(safe-area-inset-top,0px)+3.75rem)] pb-[calc(env(safe-area-inset-bottom,0px)+5.5rem)] sm:pt-20 lg:pt-24 xl:pb-16';

const authShellClass =
  'mx-auto px-3 sm:px-6 lg:px-8 pt-[calc(env(safe-area-inset-top,0px)+3.75rem)] pb-[calc(env(safe-area-inset-bottom,0px)+5.5rem)] sm:px-6 md:flex md:min-h-[calc(100dvh-4rem)] md:flex-col md:justify-center md:py-12 lg:pt-16 lg:pb-16';

function getShellBaseClass(size: AppPageShellSize): string {
  if (size === AppPageShellSize.Auth) return authShellClass;
  return defaultShellClass;
}

export function AppPageShell({
  children,
  className,
  size = AppPageShellSize.Default,
  fullBleed = false,
}: AppPageShellProps) {
  return (
    <div
      className={cn(
        'min-h-[100dvh] w-full',
        fullBleed ? '' : cn(getShellBaseClass(size), sizeClasses[size]),
        className,
      )}
    >
      {children}
    </div>
  );
}
