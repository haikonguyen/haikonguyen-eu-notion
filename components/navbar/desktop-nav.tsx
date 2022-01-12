import React from 'react';
import Box from '@mui/material/Box';
import { pages } from '@components/navbar/utils';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import tw from 'twin.macro';

const DesktopNav = () => {
  const router = useRouter();
  return (
    <Box className="flex grow hidden md:flex">
      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => router.push(page.toLocaleLowerCase())}
          css={tw`my-2 block text-white`}
        >
          {page}
        </Button>
      ))}
    </Box>
  );
};

export default DesktopNav;
