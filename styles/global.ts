import { css } from '@emotion/react';
import { useTheme } from '@mui/styles';
import { CustomTheme } from '@mui/material/styles';

const useGlobalStyle = () => {
  const theme: CustomTheme = useTheme();
  const { status } = theme || {};

  return css`
    body {
      color: ${status?.danger};
      font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    }
  `;
};

export default useGlobalStyle;
