import {
  faSpotify,
  faApple,
  faYoutube,
  faDeezer,
  faAmazon,
} from '@fortawesome/free-brands-svg-icons';
// import { Cover } from '../../assets';
import { MusicPlatform } from '../types/types'; // Import types

export const securedMusicPlatforms: MusicPlatform[] = [
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/album/1zCT0YUVggnzkZJK5VP0yd',
    icon: faSpotify,
    bgColor: 'bg-[#1DB954]',
    textColor: 'text-white',
    verified: true,
    safeRedirect: true,
  },
  {
    name: 'Apple Music',
    url: 'https://music.apple.com/ng/album/very-glorious/1789665669',
    icon: faApple,
    bgColor: 'bg-[#000]',
    textColor: 'text-white',
    verified: true,
    safeRedirect: true,
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@claudygodministries?si=6Ne99tTC48Ihv44s',
    icon: faYoutube,
    bgColor: 'bg-[#FF0000]',
    textColor: 'text-white',
    verified: true,
    safeRedirect: true,
  },
  {
    name: 'Deezer',
    url: 'https://www.deezer.com/us/album/695949191',
    icon: faDeezer,
    bgColor: 'bg-[#FEAA2D]',
    textColor: 'text-black',
    verified: true,
    safeRedirect: true,
  },
  {
    name: 'Amazon Music',
    url: 'https://music.amazon.com/albums/B0DSM7QGLF?tag=fndcmpgns-20',
    icon: faAmazon,
    bgColor: 'bg-[#FF9900]',
    textColor: 'text-black',
    verified: true,
    safeRedirect: true,
  },
];

export const latestReleasePlatforms = [
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/album/1zCT0YUVggnzkZJK5VP0yd',
    icon: faSpotify,
    bgColor: 'bg-[#1DB954]',
    textColor: 'text-white',
    verified: true,
    safeRedirect: true,
  },
  {
    name: 'Apple Music',
    url: 'https://music.apple.com/ng/album/you-are-our-everything-single/1803827230',
    icon: faApple,
    bgColor: 'bg-[#000]',
    textColor: 'text-white',
    verified: true,
    safeRedirect: true,
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/watch?v=fK_tCBcnqGs&list=OLAK5uy_nO6i6o85ojjKvu8QQlrV0keV4M_T7PPe4',
    icon: faYoutube,
    bgColor: 'bg-[#FF0000]',
    textColor: 'text-white',
    verified: true,
    safeRedirect: true,
  },
  {
    name: 'Deezer',
    url: 'https://www.deezer.com/us/album/695949191',
    icon: faDeezer,
    bgColor: 'bg-[#FEAA2D]',
    textColor: 'text-black',
    verified: true,
    safeRedirect: true,
  },
  {
    name: 'Amazon Music',
    url: 'https://music.amazon.com/albums/B0DSM7QGLF?tag=fndcmpgns-20',
    icon: faAmazon,
    bgColor: 'bg-[#FF9900]',
    textColor: 'text-black',
    verified: true,
    safeRedirect: true,
  },
];
export const streamingPlatforms = [
  { name: 'Spotify', icon: faSpotify, url: '#' },
  { name: 'Apple Music', icon: faApple, url: '#' },
  { name: 'YouTube Music', icon: faYoutube, url: '#' },
  { name: 'Deezer', icon: faDeezer, url: '#' },
];
