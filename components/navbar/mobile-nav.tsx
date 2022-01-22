import React from 'react';
import Box from '@mui/material/Box';
import { pages } from './utils';
import TemporaryDrawer from '../drawer';

const MobileNav = () => {
  return (
    <Box className="flex grow justify-between items-center sm:flex lg:hidden">
      <TemporaryDrawer anchor="left" drawerItems={pages} />
    </Box>
  );
};

export default MobileNav;
