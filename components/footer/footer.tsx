import siteConfig from '@lib/siteConfig';
import IconButton from '@mui/material/IconButton';
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';
import { Divider, Paper } from '@mui/material';
import React from 'react';

const renderIcons = (iconCase: string) => {
  switch (iconCase) {
    case 'FaFacebookF':
      return <FaFacebookF />;
    case 'FaInstagram':
      return <FaInstagram />;
    case 'FaTwitter':
      return <FaTwitter />;
    case 'FaGithub':
      return <FaGithub />;
    default:
      return <FaTwitter />;
  }
};

const Footer = () => {
  const { copyright, userLinks } = siteConfig;

  return (
    <footer>
      <Paper elevation={3}>
        <div className="my-0 mx-auto justify-center flex flex-wrap py-3">
          {userLinks.map((userLink) => (
            <a key={userLink.id} href={userLink.url} target="blank">
              <IconButton>{renderIcons(userLink.icon)}</IconButton>
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
