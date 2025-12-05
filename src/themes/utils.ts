import { blue } from '@mui/material/colors';
import { CustomThemeOptions } from '@mui/material/styles';
import { useStore } from '@lib/store';
import { useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { setSystemPaletteMode } from '@config';

export const useThemeOptions = (): CustomThemeOptions => {
  const store = useStore();
  const { paletteMode, setDarkPaletteMode, setLightPaletteMode } = store;

  const isSystemDark = useMediaQuery('(prefers-color-scheme:dark)', {
    noSsr: true,
  });

  useEffect(() => {
    setSystemPaletteMode(isSystemDark, setDarkPaletteMode, setLightPaletteMode);
  }, [isSystemDark, setDarkPaletteMode, setLightPaletteMode]);

  return {
    status: {
      danger: paletteMode === 'dark' ? blue[500] : 'red',
    },
    palette: {
      mode: paletteMode,
    },
  };
};
