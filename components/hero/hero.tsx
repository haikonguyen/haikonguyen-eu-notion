import React from 'react';
import Image from 'next/image';
import HeroWrapper from '@components/hero/styles';
import { HeroProps } from '@components/hero/types';
import heroBg from '@images/heroBg.jpg';
import heroProfileImg from '@images/heroProfileImg.png';

const Hero = ({ isHomePage }: HeroProps) => {
  return (
    <HeroWrapper
      className="relative flex items-center justify-center w-screen"
      isHomePage={isHomePage}
    >
      <Image
        src={heroBg}
        objectFit="cover"
        layout="fill"
        alt="Hero image"
        placeholder="blur"
        className="heroBgImage"
      />
      <div className="rounded-md z-10 flex items-center flex-col p-5 backdrop-filter backdrop-blur-sm bg-white bg-opacity-30 border-gray-200">
        <section>
          <Image
            src={heroProfileImg}
            width={150}
            height={150}
            alt="Hero image"
            placeholder="blur"
            className="rounded-full"
          />
        </section>
        <section>
          <h1>Haiko Nguyen</h1>
          <p>DEVELOPER, PHOTOGRAPHER, VLOGGER</p>
        </section>
      </div>
    </HeroWrapper>
  );
};

export default Hero;
