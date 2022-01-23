import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';
import { SocialIconsProps } from './types';

const SocialIcons = ({ iconVariant }: SocialIconsProps) => {
  switch (iconVariant) {
    case 'FaFacebookF':
      return <FaFacebookF />;
    case 'FaInstagram':
      return <FaInstagram />;
    case 'FaTwitter':
      return <FaTwitter />;
    case 'FaGithub':
      return <FaGithub />;
    default:
      return <FaTwitter />;
  }
};

export default SocialIcons;
