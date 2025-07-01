// Define type for video objects
export interface VideoItem {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  channel: string;
}

export const videos: VideoItem[] = [
  { 
    id: 'Eom1qlm4ork', 
    title: 'ClaudyGod on NTA10-Lagos', 
    description: 'Exclusive interview discussing ministry journey', 
    date: 'May 15, 2023',
    duration: '25:38',
    channel: 'NTA10 Lagos'
  },
  { 
    id: 'rGVHMpPIkY8', 
    title: 'Rhythm Station Feature', 
    description: 'Live performance and Q&A session', 
    date: 'March 28, 2023',
    duration: '18:42',
    channel: 'Rhythm Station'
  },
  { 
    id: 'jeY9ULX3wtY', 
    title: 'Rhema Station Special', 
    description: 'Behind the scenes of worship ministry', 
    date: 'February 10, 2023',
    duration: '32:15',
    channel: 'Rhema Station'
  },
];

export const playerOptions = {
  height: '390',
  width: '100%',
  playerVars: {
    autoplay: 1,
    modestbranding: 1,
    rel: 0,
    color: 'white',
  },
};