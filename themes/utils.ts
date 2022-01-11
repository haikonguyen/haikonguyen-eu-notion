import { blue } from '@mui/material/colors';
import { CustomThemeOptions } from '@mui/material/styles';
import useStore from '@state/store';

export const useThemeOptions = (): CustomThemeOptions => {
  const store = useStore();
  const { paletteMode } = store;

  return {
    status: {
      danger: paletteMode === 'dark' ? blue[500] : 'red',
    },
    palette: {
      mode: paletteMode,
    },
  };
};
