import React from 'react';
import Box from '@mui/material/Box';
import { pages } from '@components/navbar/utils';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

const DesktopNav = () => {
  const router = useRouter();
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: 'none', md: 'flex' },
        border: '1px solid red',
      }}
    >
      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => router.push('/somepage')}
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
          {page}
        </Button>
      ))}
    </Box>
  );
};

export default DesktopNav;
