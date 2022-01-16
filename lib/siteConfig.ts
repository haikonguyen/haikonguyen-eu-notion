const d = new Date();
const footerYear = d.getFullYear();

const siteConfig = {
  author: {
    name: 'Haiko Nguyen',
    summary: 'Developer, Photographer, Vlogger',
  },
  copyright: `Copyright © ${footerYear}. Haiko Nguyen`,
  description: 'A starter blog converting Gatsby -> Next.',
  title: 'Haiko Nguyen - Developer, Photographer, Vlogger',
  userLinks: [
    {
      label: 'Facebook',
      url: 'https://www.facebook.com/haikonguyen.eu/',
      icon: 'FaFacebookF',
    },
    {
      label: 'Instagram',
      url: 'https://www.instagram.com/haikonguyen.eu/',
      icon: 'FaInstagram',
    },
    {
      label: 'Twitter',
      url: 'https://twitter.com/haikonguyeneu',
      icon: 'FaTwitter',
    },
    {
      label: 'GitHub',
      url: 'https://github.com/haikonguyen',
      icon: 'FaGithub',
    },
  ],
};

export default siteConfig;
