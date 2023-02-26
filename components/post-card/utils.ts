import { ExternalCoverType, FileCoverType } from 'notion';
import { CoverType } from './types';
import { imgPlaceholder } from '../../constants';

export const getCoverSource = (cover: ExternalCoverType & FileCoverType) => {
  if (cover?.type === CoverType.EXTERNAL) {
    return cover.external.url;
  } else if (cover?.type === CoverType.FILE) {
    return cover.file.url;
  } else {
    return imgPlaceholder;
  }
};
