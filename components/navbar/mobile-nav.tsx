import React from 'react';
import Box from '@mui/material/Box';
import TemporaryDrawer from '@components/drawer/drawer';
import { pages } from '@components/navbar/utils';
import useStore from '@state/store';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

const MobileNav = () => {
  const { paletteMode, setPaletteMode } = useStore();

  return (
    <Box className="flex grow justify-between items-center sm:flex md:hidden">
      <TemporaryDrawer anchor="left" drawerItems={pages} />
      <IconButton onClick={() => setPaletteMode()}>
        {paletteMode === 'light' ? (
          <Brightness4Icon className="themeToggleIcon" />
        ) : (
          <Brightness7Icon className="themeToggleIcon" />
        )}
      </IconButton>
    </Box>
  );
};

export default MobileNav;
