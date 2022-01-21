export interface CoverType {
  type: 'file' | 'external';
}

export interface FileCoverType extends CoverType {
  file: {
    url: string;
    expiry_time: string;
  };
}

export interface ExternalCoverType extends CoverType {
  external: {
    url: string;
  };
}

export interface IconType {
  emoji: string;
  type?: string;
}

export interface ParentType {
  database_id: string;
  type?: string;
}

export interface CreatedByType {
  object: string;
  id: string;
  name: string;
  avatar_url: string;
  type: string;
  person: {
    email: string;
  };
}

export interface DateType {
  end?: string;
  start: string;
  time_zone?: string;
}

export interface TextType {
  content: string;
  link?: string;
}

export interface AnnotationsType {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

export interface RichTextType {
  type: string;
  text: TextType;
  annotations: AnnotationsType;
  plain_text: string;
  href?: string;
}

export interface ExcerptType {
  id: string;
  type: string;
  rich_text: RichTextType[];
}

export interface PublishedDateType {
  date?: DateType;
  id: string;
  type: string;
}

export interface MultiSelectType {
  id: string;
  name: string;
  color: string;
}

export interface TagsType {
  id: string;
  type: string;
  multi_select: MultiSelectType[];
}

export interface PropertiesType {
  author: {
    id: string;
    type: string;
    created_by: CreatedByType;
  };
  excerpt: ExcerptType;
  post_name: NameType;
  published_date: PublishedDateType;
  tags: TagsType;
}

export interface NameType {
  id: string;
  type: string;
  title: [
    {
      type: string;
      text: {
        content: string;
        link?: string;
      };
      annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
      };
      plain_text: string;
      href?: string;
    }
  ];
}

export interface BlogPostType {
  object: string;
  id: 'string';
  created_time: 'string';
  last_edited_time: 'string';
  cover: ExternalCoverType & FileCoverType;
  icon?: IconType;
  parent: ParentType;
  archived: boolean;
  properties: PropertiesType;
  url: string;
}

export interface BlogPostListType {
  blogPostList: BlogPostType[];
}