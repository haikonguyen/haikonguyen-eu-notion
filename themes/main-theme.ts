import { createTheme, CustomThemeOptions } from '@mui/material/styles';
import { useThemeOptions } from './utils';

const useCustomTheme = (): CustomThemeOptions => {
  const { status, palette } = useThemeOptions();
  return createTheme({
    status,
    palette,
  });
};

export default useCustomTheme;
