import React from 'react';
import { Herosection } from '../components/Herosection';
import { NewsletterForm } from '../components/Newsletter';
import { About1 } from '../assets/';
import { MusicBan1, MusicBan2, MusicBan3 } from '../assets/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

type TeachingType = {
  id: number;
  title: string;
  thumbnail: string;
  youtubeId: string;
  scripture: string;
  duration: string;
  teacher: string;
  date: string;
};

const teachingsData: TeachingType[] = [
  {
    id: 1,
    title: "Reviewing the signs of the lord",
    thumbnail: MusicBan1,
    youtubeId: 'abc123',
    scripture: "The Day Of The Lord",
    duration: "45:30",
    teacher: "ClaudyGodTeachings",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 2,
    title: "Reviewing the signs of the lord",
    thumbnail: MusicBan2,
    youtubeId: 'def456',
    scripture: "What’s your Motive for asking God for Help",
    duration: "32:15",
    teacher: "ClaudyGodTeachings",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 3,
    title: "Approach God By our human effort",
    thumbnail: MusicBan3,
    youtubeId: 'ghi789',
    scripture: "What’s Nimrod Agenda for building the towel of babel",
    duration: "38:45",
    teacher: "ClaudyGodTeachings",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 4,
    title: "Reviewing the signs of the lord",
    thumbnail: MusicBan3,
    youtubeId: 'ghi789',
    scripture: "Why is God Silent in certain Times and Season of our lives",
    duration: "38:45",
    teacher: "ClaudyGodTeachings",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 5,
    title: "Reviewing the signs of the lord",
    thumbnail: MusicBan3,
    youtubeId: 'ghi789',
    scripture: "Why is God Silent in certain Times and Season of our lives",
    duration: "38:45",
    teacher: "ClaudyGodTeachings",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }
];

const VideoCard: React.FC<{
  content: TeachingType;
  isSelected: boolean;
  onClick: () => void;
}> = ({ content, isSelected, onClick }) => (
  <div 
    className={`relative cursor-pointer group transition-all duration-300 ${
      isSelected ? 'ring-4 ring-purple-500' : ''
    }`}
    onClick={onClick}
  >
    <figure className="relative aspect-video overflow-hidden rounded-lg">
      <img
        src={content.thumbnail}
        alt={content.title}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <FontAwesomeIcon 
          icon={faPlay} 
          className="text-white text-4xl opacity-80 hover:opacity-100 transition-opacity" 
        />
      </div>
    </figure>
    <div className="mt-4 space-y-2">
      <h3 className="text-lg font-semibold text-gray-800">{content.title}</h3>
      <p className="text-sm text-purple-600 font-medium">{content.scripture}</p>
      <div className="flex justify-between text-sm text-gray-500">
        <span>{content.duration}</span>
        <span>{content.date}</span>
      </div>
      <p className="text-sm font-medium text-gray-500">{content.teacher}</p>
    </div>
  </div>
);

const ContentSection: React.FC<{
  title: string;
  description: string;
  contents: TeachingType[];
}> = ({ title, description, contents }) => (
  <div className="mt-16 space-y-8 px-4 max-w-7xl mx-auto">
    <div className="text-left">
      <h2 className="text-3xl md:text-4xl font-bold text-purple-900">
        {title}
      </h2>
      <div className="w-[150px] h-2 bg-purple-900 my-4"></div>
      <p className="text-gray-600 font-medium text-lg max-w-2xl">
        {description}
      </p>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {contents.map((content) => (
        <VideoCard
          key={content.id}
          content={content}
          isSelected={false}
          onClick={() => {}}
        />
      ))}
    </div>
  </div>
);

export const MinistryData: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="relative">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <Herosection 
          title="ClaudyGod Music & Ministry / Ministry"
          backgroundImage={About1}
          className="relative z-0"
        />
      </div>
      
      <ContentSection
        title="ClaudyGod Teachings"
        description="Claudy's enthusiasm for sharing the Gospel is evident in both her written and spoken communications. She is a skilled author and remains active in speaking engagements at conferences, Claudy has also guest-hosted on national television programs such as Breakfast In Bed, The Sunday Show"
        contents={teachingsData}
      />
      
      <hr className="h-px w-full bg-purple-900 border-0 mt-4" />
      <NewsletterForm />
    </div>
  );
};