import React from 'react';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import useStore from '@state/store';

const ThemeSwitcher = () => {
  const { paletteMode, setPaletteMode } = useStore();
  return (
    <IconButton onClick={() => setPaletteMode()}>
      {paletteMode === 'light' ? (
        <Brightness4Icon className="themeToggleIcon" />
      ) : (
        <Brightness7Icon className="themeToggleIcon" />
      )}
    </IconButton>
  );
};

export default ThemeSwitcher;
