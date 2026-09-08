import { getR2PublicUrl } from '@lib/r2';
import { cache } from 'react';
import { reader } from './reader';
import type { HomeAboutEntry } from './types';

const DEFAULT_HOME_ABOUT: HomeAboutEntry = {
  name: 'Haiko Nguyen',
  role: 'Senior Software Engineer & Visual Artist',
  bio: "Hello! I'm Haiko, a senior software engineer based in Prague building elegant solutions with React and a creative with a love for visual storytelling.",
  portraitImage: '/assets/images/heroProfileImg.png',
  ctaHref: '/about',
};

export const getHomeAbout = cache(async (): Promise<HomeAboutEntry> => {
  const entry = await reader.singletons.homeAbout.read();
  if (!entry) {
    return DEFAULT_HOME_ABOUT;
  }

  return {
    name: entry.name.trim() || DEFAULT_HOME_ABOUT.name,
    role: entry.role.trim() || DEFAULT_HOME_ABOUT.role,
    bio: entry.bio.trim() || DEFAULT_HOME_ABOUT.bio,
    portraitImage: getR2PublicUrl(
      entry.portraitImage.trim() || DEFAULT_HOME_ABOUT.portraitImage,
    ),
    ctaHref: entry.ctaHref.trim() || DEFAULT_HOME_ABOUT.ctaHref,
  };
});
