
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface MusicPlatform {
  name: string;
  url: string;
  icon: IconDefinition;
  bgColor: string;
  textColor: string;
  verified: boolean;
  safeRedirect: boolean;
}

export interface Album {
  id: number;
  title: string;
  year: string;
  image: string;
  tracks: Array<{ id: number; title: string; duration: string }>;
}