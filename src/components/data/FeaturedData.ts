// src/data/videos.ts
import {
  musicCover1,
  musicCover2,
  musicCover3,
  musicCover4,
  musicCover5,
  MusicBan4,
  MusicBan2,
  MusicBan3,
} from '../../assets';

export interface VideoProps {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  youtubeUrl: string;
}

export const videos: VideoProps[] = [
  {
    id: '1',
    title: 'We Would Reign',
    thumbnailUrl: musicCover1,
    duration: '4:20',
    youtubeUrl: 'https://youtu.be/s7XLwfhVSC0?si=Y9lcjVnUTvOpyzjl',
  },
  {
    id: '2',
    title: 'You Are Our Everything',
    thumbnailUrl: musicCover2,
    duration: '5:45',
    youtubeUrl: 'https://youtu.be/fK_tCBcnqGs?si=6JziWWzYpINEMuYt',
  },
  {
    id: '3',
    title: 'Lord of my Heart',
    thumbnailUrl: musicCover3,
    duration: '3:55',
    youtubeUrl: 'https://youtu.be/iOil3NAE9V4?si=jx0MNOVe5D9MLh3b',
  },
  {
    id: '4',
    title: 'He Put a New Song',
    thumbnailUrl: musicCover4,
    duration: '6:10',
    youtubeUrl: 'https://youtu.be/hto6hlHSpac?si=rGFe3niOqRcK-XVN',
  },
  {
    id: '5',
    title: 'Lover of my Soul',
    thumbnailUrl: musicCover5,
    duration: '4:30',
    youtubeUrl: 'https://youtu.be/ivj5gVeTCJQ?si=JV1kU2iW0yDuGpVH',
  },
  {
    id: '6',
    title: 'You are our Everything',
    thumbnailUrl: MusicBan4,
    duration: '5:15',
    youtubeUrl: 'https://youtu.be/mK26U9psCCI?si=pfzzYdmBVyRKN9ZS',
  },
  {
    id: '7',
    title: 'Step Aside',
    thumbnailUrl: MusicBan2,
    duration: '5:15',
    youtubeUrl: 'https://youtu.be/Q2Xz0g4Q-Ro?si=Ebx6hYvfBs2pbwvS',
  },
  {
    id: '8',
    title: 'Alleluia Worship',
    thumbnailUrl: MusicBan3,
    duration: '5:15',
    youtubeUrl: 'https://youtu.be/qdNP8A4fW-U?si=R15Gspr3i5eLeDm0',
  },
];
