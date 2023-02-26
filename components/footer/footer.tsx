import IconButton from '@mui/material/IconButton';
import { Divider, Paper } from '@mui/material';
import React from 'react';
import { SocialIcons } from '../social-icons';
import { siteConfig } from '../../constants';

const Footer = () => {
  const { copyright, userLinks } = siteConfig;

  return (
    <footer className="flex-shrink-0">
      <Paper elevation={3}>
        <div className="my-0 mx-auto justify-center flex flex-wrap py-3">
          {userLinks.map((userLink) => (
            <a key={userLink.id} href={userLink.url} target="blank">
              <IconButton>
                <SocialIcons iconVariant={userLink.icon} />
              </IconButton>
            </a>
          ))}
        </div>
        <Divider />
        <div className="h-12 flex items-center justify-center py-2.5 px-0">
          {copyright}
        </div>
      </Paper>
    </footer>
  );
};

export default Footer;
