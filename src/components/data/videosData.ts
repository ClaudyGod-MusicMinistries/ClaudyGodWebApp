export type VideoType = {
  id: number;
  title: string;
  youtubeId: string;
  category: 'Music Videos' | 'Visualizers' | 'Live Sessions';
  description: string;
  date: string;
};

export const videos: VideoType[] = [
  {
    id: 1,
    title: 'STEP ASIDE. ',
    youtubeId: '3nvGauo7kjA',
    category: 'Music Videos',
    description: 'Song by Min. ClaudyGod',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
 
  {
    id: 2,
    title: 'Nothing Compares To You',
    youtubeId: 'Dw5S-jzzboA',
    category: 'Visualizers',
    description: 'Official Music Video/Visualizer',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
    {
    id: 3,
    title: 'Dwelling Place (Forever God)',
    youtubeId: 'KoVkhbrRjf8',
    category: 'Live Sessions',
    description: ' Song By Min. ClaudyGod and Her Worship Team.',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
    {
    id: 4,
    title: 'Look To You (Official Visualizer/ Music Video)',
    youtubeId: '7BN7i4puuis',
    category: 'Visualizers',
    description: 'Song By Min. ClaudyGod',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
    {
    id: 5,
    title: 'NEW! I Love You Lord by ClaudyGod',
    youtubeId: 'SqaOeGLDPLY',
    category: 'Live Sessions',
    description: ' Song By Min. ClaudyGod and Her Worship Team.',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
       {
    id: 6,
    title: `'It's A New Day (Thank You For Today)'`,
    youtubeId: 'Ak0LZgfHMa0',
    category: 'Music Videos',
    description: 'Song by Min. Claudy',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 7,
    title: 'All of Me (Official Music Video)',
    youtubeId: 'L-AVa2qC5Ic',
   category: 'Visualizers',
    description: 'Song By Min. ClaudyGod',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
    {
    id: 8,
    title: 'VERY GLORIOUS Live Recording (Angel Inspired Song)',
    youtubeId: 'xY4508hwPfw',
    category: 'Live Sessions',
    description: ' Song By Min. ClaudyGod and Her Worship Team.',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
   {
    id: 9,
    title: 'Joyful Alleluia by ClaudyGod',
    youtubeId: 'ih4SrEgnV60',
    category: 'Music Videos',
    description: 'Song by Min. Claudy',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
    {
    id: 10,
    title: 'NOW OUT! King of the Nations',
    youtubeId: 'UZPaupINXYI',
    category: 'Live Sessions',
    description: ' Song By Min. ClaudyGod and Her Worship Team.',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
     {
    id: 11,
    title: 'Love Me So Much',
    youtubeId: 'uro0EWsYdxc',
    category: 'Music Videos',
    description: 'Song by Min. Claudy',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 12,
    title: 'Nothing Compares To You(Official Music Video/Visualizer)',
    youtubeId: 'Dw5S-jzzboA',
    category: 'Visualizers',
    description: 'Song By Min. ClaudyGod',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
    {
    id: 13,
    title: 'NEW! Very Glorious LIVE WORSHIP SESSION (An Angel Inspired Song)',
    youtubeId: '6pDDMP9Xprg',
    category: 'Live Sessions',
    description: ' Song By Min. ClaudyGod and Her Worship Team.',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
     {
    id: 14,
    title: 'Affirmation',
    youtubeId: 'bVOAeBAer4U',
    category: 'Music Videos',
    description: 'Song by Min Claudy',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 15,
    title: 'Lover of My Soul',
    youtubeId: 'lrKaURkswT0',
    category: 'Visualizers',
    description: 'Song By Min. ClaudyGod',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    })
  },
  {
    id: 16,
    title: `I Love You Lord ( Official Music Video) '`,
    youtubeId: 'r8rp58DqavM',
    category: 'Visualizers',
    description: 'Song By Min. ClaudyGod',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 17,
    title: 'Look to You',
    youtubeId: 'vS8myyETQP4',
    category: 'Visualizers',
    description: 'official Visualizer/Music Videos"',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
   {
    id: 18,
    title: 'Thank you (My midnight cry). Live session by ClaudyGod & Band',
    youtubeId: 'd7qZ32829gg',
    category: 'Live Sessions',
    description: ' Song By Min. ClaudyGod and Her Worship Team.',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }
]
