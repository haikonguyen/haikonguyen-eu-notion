import React from 'react';
import Image from 'next/image';
import { HeroProps } from './types';
import HeroWrapper from './styles';

const Hero = ({ isHomePage, children, imageSource }: HeroProps) => {
  return (
    <HeroWrapper
      className="relative flex flex-wrap items-center justify-center w-screen"
      isHomePage={isHomePage}
    >
      <Image
        className="absolute object-cover"
        src={imageSource}
        alt="Hero image"
        placeholder="blur"
        fill
      />
      {children}
    </HeroWrapper>
  );
};

export default Hero;
