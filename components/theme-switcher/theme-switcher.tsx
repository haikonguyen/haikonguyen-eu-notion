import React from 'react';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import useStore from '@state/store';

const ThemeSwitcher = () => {
  const { setIsSettingsEnabled } = useStore();
  return (
    <>
      <IconButton onClick={setIsSettingsEnabled}>
        <SettingsIcon className="themeToggleIcon" />
      </IconButton>
    </>
  );
};

export default ThemeSwitcher;
