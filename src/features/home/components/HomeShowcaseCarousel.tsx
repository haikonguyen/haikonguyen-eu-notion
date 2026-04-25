'use client';

import { Carousel } from '@components/ui/Carousel';
import { HomeEngineeringSlide } from './HomeEngineeringSlide';
import { HomePhotographySlide } from './HomePhotographySlide';
import { HomeVlogSlide } from './HomeVlogSlide';

export function HomeShowcaseCarousel() {
  return (
    <div className="relative row-span-1 h-[24rem] min-h-0 overflow-hidden rounded-3xl border border-white/10 bg-black/45 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:h-[26rem] md:col-span-2 md:h-full md:rounded-[2.5rem]">
      <Carousel
        className="h-full w-full"
        slideClassName="h-full"
        autoPlay
        autoPlayInterval={6000}
        showArrows
        showDots
      >
        <HomePhotographySlide />
        <HomeVlogSlide />
        <HomeEngineeringSlide />
      </Carousel>
    </div>
  );
}
