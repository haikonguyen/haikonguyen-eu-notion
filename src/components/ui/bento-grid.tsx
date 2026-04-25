import { ReactNode } from 'react';
import { cn } from '@lib/utils';
import Link from 'next/link';

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <div
      className={cn(
        'grid md:auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto',
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  onClick,
  href,
  showGlow = false,
  padding = 'p-10',
  titlePosition = 'top',
}: {
  className?: string;
  title?: string | ReactNode;
  description?: string | ReactNode;
  header?: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  href?: string;
  showGlow?: boolean;
  padding?: string;
  titlePosition?: 'top' | 'bottom';
}) => {
  const content = (
    <div
      onClick={onClick}
      className={cn(
        'relative row-span-1 rounded-[2.5rem] group/bento transition-all duration-500 dark:bg-[#0a0a0a]/60 bg-white border dark:border-white/10 border-neutral-200 flex flex-col overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl',
        'before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-primary/10 before:to-transparent before:opacity-0 before:transition-opacity duration-700 hover:before:opacity-100',
        (onClick || href) && 'cursor-pointer active:scale-[0.99]',
        padding,
        className,
      )}
    >
      {/* Background Glow */}
      {showGlow && (
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-40 group-hover/bento:opacity-60 transition-opacity duration-700" />
      )}

      <div className="z-10 flex flex-col flex-1 space-y-6">
        {/* Mockup Heading Style */}
        {titlePosition === 'top' && title && (
          <div className="font-sans font-bold text-primary text-[11px] uppercase tracking-[0.3em] opacity-90 mb-2">
            {title}
          </div>
        )}

        <div className="flex-1 relative min-h-[4rem]">{header}</div>

        <div
          className={cn(
            'transition duration-500 group-hover/bento:translate-x-1',
            titlePosition === 'bottom' && 'mt-auto',
          )}
        >
          {titlePosition === 'bottom' && title && (
            <div className="font-sans font-bold text-primary text-[11px] uppercase tracking-[0.3em] opacity-90 mb-3">
              {title}
            </div>
          )}
          {description && (
            <div className="font-sans font-bold text-white text-xl tracking-tight leading-tight">
              {description}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
};
