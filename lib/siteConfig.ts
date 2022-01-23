const d = new Date();
const footerYear = d.getFullYear();

const siteConfig = {
  author: {
    name: 'Haiko Nguyen',
    summary: 'Developer, Photographer, Vlogger',
  },
  copyright: `© Haiko Nguyen ${footerYear}`,
  description: 'A personal blog made by Haiko Nguyen with ❤️',
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

export default siteConfig;
