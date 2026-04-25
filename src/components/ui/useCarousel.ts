import {
  type MouseEvent,
  type TouchEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

const TOUCH_DRAG_THRESHOLD_PX = 50;
const MOUSE_DRAG_THRESHOLD_PX = 60;

export interface UseCarouselOptions {
  totalSlides: number;
  autoPlay: boolean;
  autoPlayInterval: number;
  loop: boolean;
}

export function useCarousel({
  totalSlides,
  autoPlay,
  autoPlayInterval,
  loop,
}: UseCarouselOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToSlide = useCallback(
    (index: number) => {
      if (totalSlides === 0) return;
      if (loop) {
        setCurrentIndex((index + totalSlides) % totalSlides);
        return;
      }
      setCurrentIndex(Math.max(0, Math.min(index, totalSlides - 1)));
    },
    [totalSlides, loop],
  );

  const nextSlide = useCallback(
    () => goToSlide(currentIndex + 1),
    [currentIndex, goToSlide],
  );
  const prevSlide = useCallback(
    () => goToSlide(currentIndex - 1),
    [currentIndex, goToSlide],
  );

  useEffect(() => {
    if (!autoPlay || totalSlides <= 1 || isDragging) return;
    timerRef.current = setInterval(nextSlide, autoPlayInterval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlay, autoPlayInterval, totalSlides, nextSlide, isDragging]);

  const finishDrag = (threshold: number) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > threshold) prevSlide();
    else if (dragOffset < -threshold) nextSlide();
    setDragOffset(0);
  };

  const handleTouchStart = (event: TouchEvent) => {
    setIsDragging(true);
    setDragStartX(event.touches[0].clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (!isDragging) return;
    setDragOffset(event.touches[0].clientX - dragStartX);
  };

  const handleMouseDown = (event: MouseEvent) => {
    setIsDragging(true);
    setDragStartX(event.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging) return;
    setDragOffset(event.clientX - dragStartX);
  };

  return {
    currentIndex,
    isDragging,
    dragOffset,
    goToSlide,
    nextSlide,
    prevSlide,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd: () => finishDrag(TOUCH_DRAG_THRESHOLD_PX),
    handleMouseDown,
    handleMouseMove,
    handleMouseUp: () => finishDrag(MOUSE_DRAG_THRESHOLD_PX),
    handleMouseLeave: () => finishDrag(MOUSE_DRAG_THRESHOLD_PX),
  };
}
