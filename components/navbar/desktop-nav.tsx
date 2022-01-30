import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import tw from 'twin.macro';
import { pages } from '@utils/constants';

const DesktopNav = () => {
  const router = useRouter();
  return (
    <Box className="flex grow hidden lg:flex">
      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => router.push(`/${page.toLocaleLowerCase()}`)}
          css={tw`my-2 block text-white`}
        >
          {page}
        </Button>
      ))}
    </Box>
  );
};

export default DesktopNav;
