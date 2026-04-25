import { cn } from '@lib/utils';
import type { ReactNode } from 'react';

export enum PageHeaderAlign {
  Left = 'Left',
  Center = 'Center',
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: ReactNode;
  align?: PageHeaderAlign;
  action?: ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export function PageHeader({
  title,
  subtitle,
  eyebrow,
  align = PageHeaderAlign.Left,
  action,
  className,
  titleClassName,
  subtitleClassName,
}: PageHeaderProps) {
  const isCentered = align === PageHeaderAlign.Center;

  return (
    <div
      className={cn(
        'mb-8 sm:mb-12',
        isCentered
          ? 'text-center'
          : action
            ? 'flex flex-col justify-between gap-6 md:flex-row md:items-end'
            : '',
        className,
      )}
    >
      <div className={cn(isCentered ? 'mx-auto max-w-2xl' : 'max-w-2xl')}>
        {eyebrow && (
          <div
            className={cn(
              'mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary sm:text-xs',
            )}
          >
            {eyebrow}
          </div>
        )}
        <h1
          className={cn(
            'text-2xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl leading-[1.15]',
            titleClassName,
          )}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={cn(
              'mt-2 text-sm leading-relaxed text-zinc-400 sm:mt-3 sm:text-base md:text-lg',
              isCentered && 'mx-auto',
              subtitleClassName,
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
      {action && !isCentered && <div className="shrink-0">{action}</div>}
    </div>
  );
}
