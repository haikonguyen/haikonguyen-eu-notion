declare module '@mui/material/styles' {
  import { Palette, PaletteOptions } from '@mui/material';

  interface Theme {
    status: {
      danger: string;
    };
    palette: Palette;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status: {
      danger: string;
    };
  }

  interface CustomTheme extends Theme {
    // we can add additional props to the CustomTheme below
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface CustomThemeOptions extends ThemeOptions {
    /* each prop we add in the CustomTheme must be created in the options below
    as well */
    status: {
      danger: string;
    };
    palette: PaletteOptions;
  }
  // override default createTheme function with custom theme configuration
  // eslint-disable-next-line no-unused-vars
  export function createTheme(options?: CustomThemeOptions): CustomTheme;
}
