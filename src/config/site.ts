const d = new Date();
const footerYear = d.getFullYear();

export const siteConfig = {
  author: {
    name: 'Haiko Nguyen',
    summary: 'Senior React Developer | Full Stack Next.js | Photographer | Vlogger',
    tagline: 'Building beautiful web experiences',
    bio: 'I\'m a senior React developer and full-stack Next.js specialist with a passion for creating performant, accessible web applications. When I\'m not coding, you\'ll find me behind the camera capturing moments or sharing my journey through vlogs.',
    location: 'Europe',
    avatar: '/images/avatar.png',
  },
  copyright: `© Haiko Nguyen ${footerYear}`,
  description: 'Personal blog and portfolio of Haiko Nguyen - Developer, Photographer, and Vlogger',
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
      label: 'Courses',
      url: '/courses',
    },
    {
      id: 'navLink_05',
      label: 'Services',
      url: '/services',
    },
    {
      id: 'navLink_06',
      label: 'Contact',
      url: '/contact',
    },
  ],
  userLinks: [
    {
      id: 'social_icon_01',
      label: 'GitHub',
      url: 'https://github.com/haikonguyen',
      icon: 'Github',
    },
    {
      id: 'social_icon_02',
      label: 'Twitter',
      url: 'https://twitter.com/haikonguyeneu',
      icon: 'Twitter',
    },
    {
      id: 'social_icon_03',
      label: 'Instagram',
      url: 'https://www.instagram.com/haikonguyen.eu/',
      icon: 'Instagram',
    },
    {
      id: 'social_icon_04',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/haikonguyen/',
      icon: 'Linkedin',
    },
    {
      id: 'social_icon_05',
      label: 'YouTube',
      url: 'https://www.youtube.com/@haikonguyeneu',
      icon: 'Youtube',
    },
  ],
  title: 'Haiko Nguyen - Developer, Photographer, Vlogger',
  calComUsername: 'haikonguyen', // Update with your Cal.com username
  techStack: [
    { name: 'React', icon: 'react', category: 'frontend' },
    { name: 'Next.js', icon: 'nextjs', category: 'frontend' },
    { name: 'TypeScript', icon: 'typescript', category: 'frontend' },
    { name: 'Tailwind CSS', icon: 'tailwind', category: 'frontend' },
    { name: 'Node.js', icon: 'nodejs', category: 'backend' },
    { name: 'PostgreSQL', icon: 'postgresql', category: 'backend' },
    { name: 'Prisma', icon: 'prisma', category: 'backend' },
    { name: 'Vercel', icon: 'vercel', category: 'tools' },
    { name: 'Git', icon: 'git', category: 'tools' },
    { name: 'VS Code', icon: 'vscode', category: 'tools' },
    { name: 'Figma', icon: 'figma', category: 'tools' },
    { name: 'Adobe Lightroom', icon: 'lightroom', category: 'photography' },
  ],
};

export const imgPlaceholder =
  'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png';
