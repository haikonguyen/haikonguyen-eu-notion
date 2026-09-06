'use server';

import {
  createPresignedPutUrl,
  R2_ABOUT_PREFIX,
  R2_BLOG_COVERS_PREFIX,
  R2_BLOG_INLINE_PREFIX,
  R2_PORTFOLIO_PREFIX,
} from '@lib/r2';
import { z } from 'zod';

const createR2UploadUrlSchema = z.object({
  fileName: z.string().min(1).max(200),
  contentType: z.string().min(1).max(100),
  prefix: z
    .enum([
      R2_BLOG_COVERS_PREFIX,
      R2_BLOG_INLINE_PREFIX,
      R2_ABOUT_PREFIX,
      R2_PORTFOLIO_PREFIX,
    ])
    .default(R2_BLOG_INLINE_PREFIX),
});

export type CreateR2UploadUrlState =
  | { success: true; uploadUrl: string; publicUrl: string; objectKey: string }
  | { success: false; message: string };

function toSafeObjectKey(fileName: string): string {
  return fileName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function createR2UploadUrl(
  input: z.infer<typeof createR2UploadUrlSchema>,
): Promise<CreateR2UploadUrlState> {
  const parsed = createR2UploadUrlSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: 'Invalid upload request' };
  }

  const safeName = toSafeObjectKey(parsed.data.fileName);
  if (!safeName) {
    return { success: false, message: 'Invalid file name' };
  }

  try {
    const result = await createPresignedPutUrl({
      objectKey: `${parsed.data.prefix}/${Date.now()}-${safeName}`,
      contentType: parsed.data.contentType,
    });

    return {
      success: true,
      uploadUrl: result.uploadUrl,
      publicUrl: result.publicUrl,
      objectKey: result.objectKey,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to create upload URL';
    return { success: false, message };
  }
}
