export enum FavoriteKind {
  Post = 'post',
  Software = 'software',
  Photography = 'photography',
  Vlog = 'vlog',
  Service = 'service',
}

export interface FavoriteItem {
  id: string;
  kind: FavoriteKind;
  title: string;
  href: string;
  image?: string;
  excerpt?: string;
}
