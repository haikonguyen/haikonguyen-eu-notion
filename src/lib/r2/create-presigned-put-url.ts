import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { createR2Client, requireR2BucketName } from './client';
import { R2_PRESIGNED_PUT_EXPIRES_SECONDS } from './constants';
import { getR2PublicUrl } from './get-public-url';

export interface CreatePresignedPutUrlInput {
  objectKey: string;
  contentType: string;
}

export interface CreatePresignedPutUrlResult {
  uploadUrl: string;
  publicUrl: string;
  objectKey: string;
  expiresInSeconds: number;
}

export async function createPresignedPutUrl({
  objectKey,
  contentType,
}: CreatePresignedPutUrlInput): Promise<CreatePresignedPutUrlResult> {
  const key = objectKey.replace(/^\//, '');
  const client = createR2Client();
  const command = new PutObjectCommand({
    Bucket: requireR2BucketName(),
    Key: key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(client, command, {
    expiresIn: R2_PRESIGNED_PUT_EXPIRES_SECONDS,
  });

  return {
    uploadUrl,
    publicUrl: getR2PublicUrl(key),
    objectKey: key,
    expiresInSeconds: R2_PRESIGNED_PUT_EXPIRES_SECONDS,
  };
}
