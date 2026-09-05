import { cache } from 'react';
import { reader } from './reader';
import type { AboutStory } from './types';

export const getAboutStory = cache(async (): Promise<AboutStory | null> => {
  const entry = await reader.singletons.aboutStory.read({
    resolveLinkedFiles: true,
  });

  if (!entry) {
    return null;
  }

  return {
    content: entry.content.node,
  };
});
