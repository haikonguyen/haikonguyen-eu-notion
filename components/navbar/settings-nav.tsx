import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TemporaryDrawer from '../drawer';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Divider, useMediaQuery } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import useStore from '@state/store';
import { setSystemPaletteMode } from '../../constants';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';

const SettingsNav = () => {
  const [themeToggleValue, setThemeToggleValue] = useState('system');
  const {
    isSettingsEnabled,
    setIsSettingsEnabled,
    setDarkPaletteMode,
    setLightPaletteMode,
  } = useStore();
  const isSystemDark = useMediaQuery('(prefers-color-scheme:dark)', {
    noSsr: true,
  });

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    themeToggleValue: string
  ) => {
    switch (themeToggleValue) {
      case 'dark':
        setThemeToggleValue('dark');
        setDarkPaletteMode();
        break;

      case 'light':
        setThemeToggleValue('light');
        setLightPaletteMode();
        break;

      case 'system':
        setThemeToggleValue('system');
        setSystemPaletteMode(
          isSystemDark,
          setDarkPaletteMode,
          setLightPaletteMode
        );
        break;
    }
  };

  return (
    <Box className="flex grow justify-end">
      <TemporaryDrawer
        isDrawerEnabled={isSettingsEnabled}
        anchor="right"
        isSettingNav
        onClick={() => setIsSettingsEnabled()}
        onClose={() => setIsSettingsEnabled()}
      >
        <div className="p-3">
          <section className="flex justify-between items-center w-full">
            <span>Settings</span>
            <IconButton onClick={() => setIsSettingsEnabled()}>
              <CloseIcon />
            </IconButton>
          </section>
          <Divider />
          <section className="py-3">
            <ToggleButtonGroup
              color="primary"
              value={themeToggleValue}
              exclusive
              onChange={handleChange}
            >
              <ToggleButton value="light">
                <LightModeIcon className="mr-3" />
                Light
              </ToggleButton>

              <ToggleButton value="system">
                <SettingsBrightnessIcon className="mr-3" />
                System
              </ToggleButton>
              <ToggleButton value="dark">
                <DarkModeIcon className="mr-3" />
                Dark
              </ToggleButton>
            </ToggleButtonGroup>
          </section>
        </div>
      </TemporaryDrawer>
    </Box>
  );
};

export default SettingsNav;
