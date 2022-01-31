import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import tw from 'twin.macro';
import { siteConfig } from '@utils/constants';

const DesktopNav = () => {
  const router = useRouter();
  return (
    <Box className="flex grow hidden lg:flex">
      {siteConfig.navLinks.map((navLink) => (
        <Button
          key={navLink.id}
          onClick={() => router.push(navLink.url.toLocaleLowerCase())}
          css={tw`my-2 block text-white`}
        >
          {navLink.label}
        </Button>
      ))}
    </Box>
  );
};

export default DesktopNav;
