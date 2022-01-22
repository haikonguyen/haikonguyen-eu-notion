import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import useStore from '@state/store';
import React from 'react';
import DrawerItemList from './drawer-item-list';
import { TemporaryDrawerProps } from './types';
import { toggleDrawer } from './utils';

export default function TemporaryDrawer({
  anchor,
  drawerItems,
}: TemporaryDrawerProps) {
  const { isDrawerOpened, setIsDrawerOpened } = useStore();

  return (
    <>
      <React.Fragment key={anchor}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={() => toggleDrawer(isDrawerOpened, setIsDrawerOpened)}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor={anchor}
          open={isDrawerOpened}
          onClose={() => toggleDrawer(isDrawerOpened, setIsDrawerOpened)}
        >
          <DrawerItemList anchor={anchor} drawerItems={drawerItems} hasLogo />
        </Drawer>
      </React.Fragment>
    </>
  );
}
