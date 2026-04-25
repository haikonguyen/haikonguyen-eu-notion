import { cn } from '@lib/utils';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const BENTO_GRID_GAP_CLASS = 'gap-4 sm:gap-6 md:gap-8';

export enum BentoTitlePosition {
  Top = 'top',
  Bottom = 'bottom',
}

export interface BentoGridProps {
  className?: string;
  children?: ReactNode;
}

export interface BentoGridItemProps {
  className?: string;
  title?: string | ReactNode;
  description?: string | ReactNode;
  header?: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  href?: string;
  showGlow?: boolean;
  padding?: string;
  titlePosition?: BentoTitlePosition;
}

export function BentoGrid({ className, children }: BentoGridProps) {
  return (
    <div
      className={cn(
        'mx-auto grid max-w-7xl grid-cols-1 md:auto-rows-[22rem] md:grid-cols-3',
        BENTO_GRID_GAP_CLASS,
        className,
      )}
    >
      {children}
    </div>
  );
}

function BentoItemTitle({
  title,
  icon,
}: {
  title?: string | ReactNode;
  icon?: ReactNode;
}) {
  if (!title && !icon) return null;

  return (
    <div className="mb-1 flex items-center gap-2 font-sans text-[11px] font-bold tracking-[0.3em] text-primary uppercase opacity-90">
      {icon}
      {title ? <span>{title}</span> : null}
    </div>
  );
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
  onClick,
  href,
  showGlow = false,
  padding = 'p-4 sm:p-6 md:p-8',
  titlePosition = BentoTitlePosition.Top,
}: BentoGridItemProps) {
  const isInteractive = Boolean(onClick || href);
  const isTitleTop = titlePosition === BentoTitlePosition.Top;
  const itemClassName = cn(
    'relative row-span-1 flex h-full min-h-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-black/45 text-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-500 group/bento md:rounded-[2.5rem]',
    'before:absolute before:inset-0 before:-z-10 before:bg-linear-to-br before:from-primary/10 before:to-transparent before:opacity-0 before:transition-opacity before:duration-700 hover:before:opacity-100',
    isInteractive && 'cursor-pointer active:scale-[0.99]',
    padding,
    className,
  );

  const body = (
    <>
      {showGlow ? (
        <div className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-primary/20 opacity-40 blur-[120px] transition-opacity duration-700 group-hover/bento:opacity-60" />
      ) : null}

      <div className="z-10 flex flex-1 flex-col space-y-4 sm:space-y-6">
        {isTitleTop ? <BentoItemTitle title={title} icon={icon} /> : null}

        <div className="relative min-h-14 flex-1">{header}</div>

        <div
          className={cn(
            'transition duration-500 group-hover/bento:translate-x-1',
            !isTitleTop && 'mt-auto',
          )}
        >
          {!isTitleTop ? (
            <div className="mb-2">
              <BentoItemTitle title={title} icon={icon} />
            </div>
          ) : null}
          {description ? (
            <div className="font-sans text-lg leading-tight font-bold tracking-tight text-white sm:text-xl">
              {description}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={itemClassName}>
        {body}
      </Link>
    );
  }

  return (
    <div
      onClick={onClick}
      onKeyDown={
        onClick
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') onClick();
            }
          : undefined
      }
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={itemClassName}
    >
      {body}
    </div>
  );
}
