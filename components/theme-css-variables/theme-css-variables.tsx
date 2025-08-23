import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';

const ThemeCssVariables = () => {
  const theme = useTheme();

  useEffect(() => {
    document.body.style.setProperty('--primary-text-color', theme.palette.text.primary);
    document.body.style.setProperty('--primary-background-color', theme.palette.background.default);
  }, [theme]);

  return null;
};

export default ThemeCssVariables;
