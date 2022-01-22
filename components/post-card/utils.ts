import { ExternalCoverType, FileCoverType } from 'notion';
import { CoverType } from './types';

export const getCoverSource = (cover: ExternalCoverType & FileCoverType) => {
  if (cover.type === CoverType.EXTERNAL) {
    return cover.external.url;
  } else {
    return cover.file.url;
  }
};
