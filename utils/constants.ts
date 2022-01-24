const d = new Date();
const footerYear = d.getFullYear();

export const HOME_OG_IMAGE_URL =
  'https://og-image.vercel.app/Next.js%20Blog%20Starter%20Example.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg';

export const siteConfig = {
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
