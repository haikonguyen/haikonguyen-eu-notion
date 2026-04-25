export enum PortfolioCategory {
  All = 'All',
  Dev = 'Dev',
  Photo = 'Photo',
  Vlogs = 'Vlogs',
}

export enum SoftwareProjectId {
  QuantumCrm = 'quantumCrm',
  NovaUi = 'novaUi',
}

export enum PortfolioVlogId {
  BehindTheScenes = 'v1',
  PragueWinter = 'v2',
}

export interface SoftwareProject {
  id: SoftwareProjectId;
  image: string;
  tags: string[];
  tech: string[];
  github?: string;
  demo?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
  tech?: string[];
}

export interface PortfolioVlog {
  id: PortfolioVlogId;
  duration: string;
  thumbnail: string;
  youtubeId: string;
}
