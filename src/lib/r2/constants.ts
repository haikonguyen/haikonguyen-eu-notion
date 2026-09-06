export const R2_BLOG_COVERS_PREFIX = 'blog/covers';
export const R2_BLOG_INLINE_PREFIX = 'blog/inline';
export const R2_ABOUT_PREFIX = 'about';
export const R2_PORTFOLIO_PREFIX = 'portfolio';
export const R2_PRESIGNED_PUT_EXPIRES_SECONDS = 900;

export const R2_UPLOAD_PREFIXES = [
  R2_BLOG_COVERS_PREFIX,
  R2_BLOG_INLINE_PREFIX,
  R2_ABOUT_PREFIX,
  R2_PORTFOLIO_PREFIX,
] as const;

export type R2UploadPrefix = (typeof R2_UPLOAD_PREFIXES)[number];
