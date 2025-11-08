import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { siteConfig } from '../../constants';

const DesktopNav = () => {
  const router = useRouter();
  return (
    <Box className="flex grow hidden lg:flex">
      {siteConfig.navLinks.map((navLink) => (
        <Button
          key={navLink.id}
          onClick={() => router.push(navLink.url.toLocaleLowerCase())}
          sx={(theme) => ({
            color: theme.palette.text.primary,
          })}
        >
          {navLink.label}
        </Button>
      ))}
    </Box>
  );
};

export default DesktopNav;
