'use client';

import { cn } from '@lib/utils';
import { useTranslations } from 'next-intl';
import { Children, type ReactNode } from 'react';
import { CarouselControls } from './CarouselControls';
import { useCarousel } from './useCarousel';

const DEFAULT_AUTO_PLAY_INTERVAL_MS = 5000;

export interface CarouselProps<T> {
  items?: T[];
  renderItem?: (item: T, index: number) => ReactNode;
  children?: ReactNode;
  className?: string;
  slideClassName?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  loop?: boolean;
}

export function Carousel<T>({
  items,
  renderItem,
  children,
  className,
  slideClassName,
  autoPlay = false,
  autoPlayInterval = DEFAULT_AUTO_PLAY_INTERVAL_MS,
  showArrows = true,
  showDots = true,
  loop = true,
}: CarouselProps<T>) {
  const t = useTranslations('Common');
  const slideList: ReactNode[] = items
    ? items.map((item, index) =>
        renderItem ? renderItem(item, index) : (item as unknown as ReactNode),
      )
    : Children.toArray(children);
  const totalSlides = slideList.length;
  const carousel = useCarousel({
    totalSlides,
    autoPlay,
    autoPlayInterval,
    loop,
  });

  if (totalSlides === 0) return null;

  return (
    <div
      className={cn(
        'group relative h-full w-full overflow-hidden select-none',
        className,
      )}
      onTouchStart={carousel.handleTouchStart}
      onTouchMove={carousel.handleTouchMove}
      onTouchEnd={carousel.handleTouchEnd}
      onMouseDown={carousel.handleMouseDown}
      onMouseMove={carousel.handleMouseMove}
      onMouseUp={carousel.handleMouseUp}
      onMouseLeave={carousel.handleMouseLeave}
      role="region"
      aria-roledescription="carousel"
      aria-label={t('carousel')}
    >
      <div
        className={cn(
          'flex h-full w-full',
          carousel.isDragging
            ? 'cursor-grabbing transition-none'
            : 'cursor-grab transition-transform duration-500 ease-out',
        )}
        style={{
          transform: `translateX(calc(-${carousel.currentIndex * 100}% + ${carousel.dragOffset}px))`,
        }}
      >
        {slideList.map((slide, index) => (
          <div
            key={index}
            className={cn(
              'h-full w-full min-w-full flex-shrink-0',
              slideClassName,
            )}
            aria-hidden={carousel.currentIndex !== index}
          >
            {slide}
          </div>
        ))}
      </div>
      <CarouselControls
        totalSlides={totalSlides}
        currentIndex={carousel.currentIndex}
        loop={loop}
        showArrows={showArrows}
        showDots={showDots}
        onPrev={carousel.prevSlide}
        onNext={carousel.nextSlide}
        onGoTo={carousel.goToSlide}
      />
    </div>
  );
}
