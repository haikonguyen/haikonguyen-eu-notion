import type {
  BlockObjectResponse,
  ListBlockChildrenResponse,
  PageObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';

// =============================================================================
// SDK Type Aliases - Use official Notion types where possible
// =============================================================================

/**
 * Rich text item from Notion SDK
 */
export type NotionRichText = RichTextItemResponse;

/**
 * Block response from Notion SDK - extended with children for nested blocks
 * Uses Partial to allow SDK type guards to work correctly
 */
export type NotionBlock = BlockObjectResponse & {
  blocks?: NotionBlock[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

/**
 * Page response from Notion SDK
 * Re-exported for convenience
 */
export type NotionPage = PageObjectResponse;

/**
 * Blog page - extends PageObjectResponse with your database-specific properties
 * Use this for pages from your blog database with known property structure
 */
export interface BlogPage extends Omit<PageObjectResponse, 'properties'> {
  properties: {
    author: {
      id: string;
      type: 'created_by';
      created_by: {
        object: string;
        id: string;
        name: string;
        avatar_url: string;
        type: string;
        person: { email: string };
      };
    };
    excerpt: {
      id: string;
      type: 'rich_text';
      rich_text: Array<{ plain_text: string }>;
    };
    post_name: {
      id: string;
      type: 'title';
      title: Array<{ plain_text: string }>;
    };
    published_date: {
      id: string;
      type: 'date';
      date: { start: string; end?: string } | null;
    };
    tags: {
      id: string;
      type: 'multi_select';
      multi_select: Array<{ id: string; name: string; color: string }>;
    };
    slug?: {
      id: string;
      type: 'rich_text';
      rich_text: Array<{ plain_text: string }>;
    };
  };
  // Cover is inherited from PageObjectResponse
}

// =============================================================================
// Custom Types - Tailored to your specific database schema
// =============================================================================

export interface AnnotationsType {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

// =============================================================================
// Cover Types
// =============================================================================

export interface CoverType {
  type: 'file' | 'external';
}

export interface ExternalCoverType extends CoverType {
  external: {
    url: string;
  };
}

export interface FileCoverType extends CoverType {
  file: {
    url: string;
    expiry_time: string;
  };
}

// =============================================================================
// Property Types - Specific to your Notion database
// =============================================================================

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

export interface RichTextType {
  type: string;
  text: TextType;
  annotations: AnnotationsType;
  plain_text: string;
  href?: string;
}

export interface TextType {
  content: string;
  link?: string;
}

export interface ExcerptType {
  id: string;
  type: string;
  rich_text: RichTextType[];
}

export interface NameType {
  id: string;
  type: string;
  title: Array<{
    type: string;
    text: {
      content: string;
      link?: string;
    };
    annotations: AnnotationsType;
    plain_text: string;
    href?: string;
  }>;
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

/**
 * Slug property type for human-readable URLs
 */
export interface SlugType {
  id: string;
  type: 'rich_text';
  rich_text: Array<{ plain_text: string }>;
}

/**
 * Properties specific to your blog database
 * Matches the columns in your Notion database
 */
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
  /** Custom slug for human-readable URLs - falls back to page ID if empty */
  slug?: SlugType;
}

// =============================================================================
// Page/Post Types
// =============================================================================

export interface IconType {
  emoji: string;
  type?: string;
}

export interface ParentType {
  database_id: string;
  type?: string;
}

/**
 * Blog post from your Notion database
 */
export interface BlogPostType {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
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

// =============================================================================
// Component Props
// =============================================================================

export interface NestedChildBlock {
  id: string;
  children: ListBlockChildrenResponse;
}
