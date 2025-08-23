import React from 'react';
import Image from 'next/image';
import { HeroProps } from './types';

const Hero = ({ isHomePage, children, imageSource }: HeroProps) => {
  return (
    <div
      className={`relative flex flex-wrap items-center justify-center w-screen ${
        isHomePage ? 'h-[70vh]' : 'h-[40vh]'
      } [&>section]:py-4 [&>section]:text-center`}
    >
      <Image
        className="absolute object-cover"
        src={imageSource}
        alt="Hero image"
        placeholder="blur"
        fill
      />
      {children}
    </div>
  );
};

export default Hero;
