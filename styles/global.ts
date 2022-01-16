import { css } from '@emotion/react';
import { useTheme } from '@mui/styles';
import { CustomTheme } from '@mui/material/styles';
import tw from 'twin.macro';

const useGlobalStyle = () => {
  const theme: CustomTheme = useTheme();
  const { palette } = theme || {};

  return css`
    body {
      color: ${palette.text.primary};
      font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
      background-color: ${palette.background.default};
      outline: none;
      overflow-wrap: break-word;
      word-wrap: break-word;
    }

    h1 {
      ${tw`text-2xl md:text-4xl font-bold`}
    }

    h2 {
      ${tw`text-xl md:text-3xl font-bold`}
    }

    h3 {
      ${tw`text-lg md:text-xl font-bold`}
    }

    p {
      ${tw`text-base py-2 md:py-4`}
    }

    a:-webkit-any-link {
      text-decoration: none;
    }
  `;
};

export default useGlobalStyle;
