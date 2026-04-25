'use client';

import Link from 'next/link';
import Image from 'next/image';
import mainLogo from '@images/mainLogoOptimized.png';

export const Logo = () => {
  return (
    <Link href="/" className="group flex items-center no-underline">
      <div className="relative h-10 w-10 transition-transform group-hover:scale-110 duration-500">
        <Image
          src={mainLogo}
          alt="Haiko Nguyen"
          fill
          className="object-contain invert brightness-0"
        />
      </div>
    </Link>
  );
};
