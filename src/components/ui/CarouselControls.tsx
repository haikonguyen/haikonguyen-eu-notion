'use client';

import { cn } from '@lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface CarouselControlsProps {
  totalSlides: number;
  currentIndex: number;
  loop: boolean;
  showArrows: boolean;
  showDots: boolean;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
}

export function CarouselControls({
  totalSlides,
  currentIndex,
  loop,
  showArrows,
  showDots,
  onPrev,
  onNext,
  onGoTo,
}: CarouselControlsProps) {
  const t = useTranslations('Common');

  if (totalSlides <= 1) return null;

  return (
    <>
      {showArrows && (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onPrev();
            }}
            disabled={!loop && currentIndex === 0}
            className="absolute top-1/2 left-3 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white opacity-0 shadow-lg backdrop-blur-xl transition-all hover:scale-110 hover:bg-white/20 active:scale-95 group-hover:opacity-100 disabled:pointer-events-none disabled:opacity-0 sm:opacity-75"
            aria-label={t('previousSlide')}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNext();
            }}
            disabled={!loop && currentIndex === totalSlides - 1}
            className="absolute top-1/2 right-3 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white opacity-0 shadow-lg backdrop-blur-xl transition-all hover:scale-110 hover:bg-white/20 active:scale-95 group-hover:opacity-100 disabled:pointer-events-none disabled:opacity-0 sm:opacity-75"
            aria-label={t('nextSlide')}
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}
      {showDots && (
        <div className="absolute bottom-3.5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 backdrop-blur-xl">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onGoTo(index);
              }}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                currentIndex === index
                  ? 'w-6 bg-primary shadow-[0_0_10px_rgba(6,182,212,0.6)]'
                  : 'w-1.5 bg-white/40 hover:bg-white/70',
              )}
              aria-label={t('goToSlide', { index: index + 1 })}
            />
          ))}
        </div>
      )}
    </>
  );
}
