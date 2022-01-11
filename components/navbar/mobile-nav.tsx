import React from 'react';
import Box from '@mui/material/Box';
import TemporaryDrawer from '@components/drawer/drawer';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';
import mainLogo from '@images/mainLogoOptimized.png';
import { useRouter } from 'next/router';

const MobileNav = () => {
  const router = useRouter();
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: 'flex', md: 'none' },
        border: '1px solid red',
      }}
    >
      <TemporaryDrawer />

      <IconButton
        sx={{ display: { xs: 'flex', md: 'none' } }}
        aria-label="menu"
        onClick={() => router.push('/somepage')}
      >
        <Image width={40} height={40} src={mainLogo} alt="The logo" />
      </IconButton>
    </Box>
  );
};

export default MobileNav;
