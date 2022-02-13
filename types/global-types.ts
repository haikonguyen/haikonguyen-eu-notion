import { BlockWithChildrenType, BlogPostType } from 'notion';
import { AtRule } from 'csstype';

export interface EmailBodyProps {
  name: string;
  email: string;
  mailMessage: string;
}

export interface GetStaticPropsType {
  params: {
    id: string;
  };
}

export interface AboutPageProps {
  blocks: BlockWithChildrenType[];
  pageProps: BlogPostType;
}
