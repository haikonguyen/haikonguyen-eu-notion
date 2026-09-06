import { R2_BLOG_INLINE_PREFIX, type R2UploadPrefix } from '@lib/r2';
import { createR2UploadUrl } from '@/actions/create-r2-upload-url';

interface UploadImageToR2Input {
  file: File;
  prefix?: R2UploadPrefix;
}

interface UploadImageToR2Result {
  publicUrl: string;
  objectKey: string;
}

export async function uploadImageToR2({
  file,
  prefix = R2_BLOG_INLINE_PREFIX,
}: UploadImageToR2Input): Promise<UploadImageToR2Result> {
  const signed = await createR2UploadUrl({
    fileName: file.name,
    contentType: file.type || 'application/octet-stream',
    prefix,
  });

  if (!signed.success) {
    throw new Error(signed.message);
  }

  const response = await fetch(signed.uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error(`R2 upload failed (${response.status})`);
  }

  return {
    publicUrl: signed.publicUrl,
    objectKey: signed.objectKey,
  };
}
