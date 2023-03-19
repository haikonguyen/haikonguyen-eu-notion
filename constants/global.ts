const d = new Date();
const footerYear = d.getFullYear();

export const siteConfig = {
  author: {
    name: 'Haiko Nguyen',
    summary: 'Developer, Photographer, Vlogger',
  },
  copyright: `© Haiko Nguyen ${footerYear}`,
  description: 'A personal blog made by Haiko Nguyen with ❤️',
  url: 'https://www.haikonguyen.eu',
  navLinks: [
    {
      id: 'navLink_01',
      label: 'Home',
      url: '/',
    },
    {
      id: 'navLink_02',
      label: 'About',
      url: '/about',
    },
    {
      id: 'navLink_03',
      label: 'Blog',
      url: '/blog',
    },
    {
      id: 'navLink_04',
      label: 'Contact',
      url: '/contact',
    },
  ],
  title: 'Haiko Nguyen - Developer, Photographer, Vlogger',
  userLinks: [
    {
      id: 'social_icon_01',
      label: 'Facebook',
      url: 'https://www.facebook.com/haikonguyen.eu/',
      icon: 'FaFacebookF',
    },
    {
      id: 'social_icon_02',
      label: 'Instagram',
      url: 'https://www.instagram.com/haikonguyen.eu/',
      icon: 'FaInstagram',
    },
    {
      id: 'social_icon_03',
      label: 'Twitter',
      url: 'https://twitter.com/haikonguyeneu',
      icon: 'FaTwitter',
    },
    {
      id: 'social_icon_04',
      label: 'GitHub',
      url: 'https://github.com/haikonguyen',
      icon: 'FaGithub',
    },
  ],
};

export enum ToastType {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

export const imgPlaceholder =
  'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png';

export const setSystemPaletteMode = (
  isSystemDark: boolean,
  setDarkPaletteMode: () => void,
  setLightPaletteMode: () => void
) => (isSystemDark ? setDarkPaletteMode() : setLightPaletteMode());
