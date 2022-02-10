import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { TemporaryDrawerProps } from './types';
import SettingsIcon from '@mui/icons-material/Settings';

export default function TemporaryDrawer({
  anchor,
  children,
  isSettingNav,
  isDrawerEnabled,
  onClick,
  onClose,
  sx,
}: TemporaryDrawerProps) {
  return (
    <>
      <React.Fragment key={anchor}>
        <IconButton
          size="large"
          aria-label="settings"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={onClick}
          color="inherit"
        >
          {isSettingNav ? <SettingsIcon /> : <MenuIcon />}
        </IconButton>
        <Drawer
          anchor={anchor}
          open={isDrawerEnabled}
          onClose={onClose}
          sx={sx}
        >
          {children}
        </Drawer>
      </React.Fragment>
    </>
  );
}
