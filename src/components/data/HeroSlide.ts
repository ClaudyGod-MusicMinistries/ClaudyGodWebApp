/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ReactNode, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  faMusic,
  faVideo,
  faNewspaper,
  faPodcast,
} from '@fortawesome/free-solid-svg-icons';

import { Transition, Variants } from 'framer-motion';

export interface HeroSlide {
  videoUrl: any;
  id: number;
  imageUrl?: string;
  imageUrlMobile?: string;
  imageUrlDesktop?: string;
  type: 'quote' | 'form' | 'streaming' | 'cta' | 'music';
  content?: {
    quote?: string;
    reference?: string;
    formTitle?: string;
    streamingPlatforms?: { name: string; icon: IconDefinition; url: string }[];
    listenText?: string;
  };
}

export interface TextVariantsProps {
  children: ReactNode;
  className?: string;
}

export interface SlideContentProps {
  slide: HeroSlide;
  navigate: ReturnType<typeof useNavigate>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

// Correctly typed textVariants
export const textVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 10,
      duration: 0.5,
    } as Transition,
  },
};

export const imageVariants: Variants = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 3,
      ease: 'easeInOut',
    } as Transition,
  },
};

export const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 2.5, ease: 'easeInOut' } as Transition,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
    transition: { duration: 2.5, ease: 'easeInOut' } as Transition,
  }),
};

// Spring transition for modal
const springTransition: Transition = {
  type: 'spring',
  damping: 25,
  stiffness: 300,
};

export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 1.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springTransition,
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2 } as Transition,
  },
};

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    imageUrlMobile:
      'https://cdn.jsdelivr.net/gh/ClaudyGod-MusicMinistries/CGM-Assets@latest/desktopBg.jpg',
    imageUrlDesktop:
      'https://cdn.jsdelivr.net/gh/ClaudyGod-MusicMinistries/CGM-Assets@latest/desktopBg.jpg',
    type: 'quote',
    content: {
      quote:
        'Enter Into His Gates With Thanksgiving And Into His Courts With Praise; Be Thankful Unto Him, and Bless His Name.',
      reference: '— Psalm 100:4',
    },
    videoUrl: undefined,
  },
  {
    id: 2,
    imageUrl:
      'https://cdn.jsdelivr.net/gh/ClaudyGod-MusicMinistries/CGM-Assets@latest/abt_2.webp',
    type: 'cta',
    content: {},
    videoUrl: undefined,
  },
  {
    id: 3,
    imageUrl:
      'https://cdn.jsdelivr.net/gh/ClaudyGod-MusicMinistries/CGM-Assets@latest/Bg_13.webp',
    type: 'music',
    content: {
      listenText: 'Experience the Divine Melody',
      streamingPlatforms: [
        {
          name: 'Spotify',
          icon: faMusic,
          url: 'https://open.spotify.com/album/2MY5xlrYfuvKXaYfdB5v2A',
        },
        {
          name: 'Apple Music',
          icon: faPodcast,
          url: 'https://music.apple.com/ng/album/very-glorious/1789665669',
        },
        {
          name: 'YouTube',
          icon: faVideo,
          url: 'https://youtube.com/@claudygodministries',
        },
        {
          name: 'Itunes',
          icon: faVideo,
          url: 'https://music.apple.com/ng/album/very-glorious/1789665669',
        },
        {
          name: 'Deezer',
          icon: faNewspaper,
          url: 'https://www.deezer.com/us/album/695949191',
        },
        { name: 'Pandora', icon: faNewspaper, url: 'https://found.ee/58RtlR' },
        {
          name: 'Amazon',
          icon: faNewspaper,
          url: 'https://music.amazon.com/albums/B0DSM7QGLF',
        },
      ],
    },
    videoUrl: undefined,
  },
  {
    id: 4,
    // CORRECTED: Using the actual BannerLanding.webp file
    imageUrl:
      'https://cdn.jsdelivr.net/gh/ClaudyGod-MusicMinistries/CGM-Assets@latest/BannerLanding.webp',
    type: 'quote',
    content: {
      quote: 'Praise the Lord Most High',
      reference: '— Psalm 100:4',
    },
    videoUrl: undefined,
  },
];
