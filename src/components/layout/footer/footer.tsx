import React from 'react';
import { siteConfig } from '@config';
import { SocialIcons } from '@components/common/social-icons';

export const Footer = () => {
  const { copyright, userLinks } = siteConfig;

  return (
    <footer className="mt-auto border-t border-white/10 bg-black py-12 px-4 md:px-6">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-sm text-muted-foreground">
          {copyright}
        </div>
        
        <div className="flex items-center gap-4">
          {userLinks.map((userLink) => (
            <a
              key={userLink.id}
              href={userLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <SocialIcons iconVariant={userLink.icon} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
