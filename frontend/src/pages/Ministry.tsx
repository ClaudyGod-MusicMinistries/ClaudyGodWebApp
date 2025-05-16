import React, { useState, useEffect } from 'react';
import { Herosection } from '../components/Herosection';
import { NewsletterForm } from '../components/Newsletter';
import { About1, ministry10, ministry11, ministry12, ministry13, ministry14, ministry15, ministry16, ministry18, ministry19, ministry20, ministry9 } from '../assets/';
import { Ministry1, ministry2, ministry3, ministry4, ministry17, ministry5, ministry6, ministry7, ministry8 } from '../assets/';
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
    thumbnail: Ministry1,
    youtubeId: 'abc123',
    scripture: "Teens Teachings Series",
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
    thumbnail: ministry2,
    youtubeId: 'def456',
    scripture: "Abraham's Kind of Faith",
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
    thumbnail: ministry5,
    youtubeId: 'ghi789',
    scripture: "Being a Good Person is not a guarantee",
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
    title: "Who do you turn to when in Distress",
    thumbnail: ministry6,
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
    title: "Don't just be a hearer only",
    thumbnail: ministry7,
    youtubeId: 'ghi789',
    scripture: "Nuggets for your gr",
    duration: "38:45",
    teacher: "ClaudyGodTeachings",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 6,
    title: "All Kinds of Sin Deplease God",
    thumbnail: ministry3,
    youtubeId: 'ghi789',
    scripture: "Nuggets for your Spiritual Growth",
    duration: "38:45",
    teacher: "ClaudyGodTeachings",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 7,
    title: "Are you a Wheat or a Weed",
    thumbnail: ministry4,
    youtubeId: 'ghi789',
    scripture: "Nuggets for your growth",
    duration: "38:45",
    teacher: "ClaudyGodTeachings",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 8,
    title: "Following the Lord's Guidiance",
    thumbnail: ministry8,
    youtubeId: 'ghi789',
    scripture: "Nuggets for your Spiritual Growth",
    duration: "38:45",
    teacher: "ClaudyGodTeachings",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 9,
    title: "God Knows how to Defy the normal ",
    thumbnail: ministry9,
    youtubeId: 'ghi789',
    scripture: "Nuggets for your Spiritual Growth",
    duration: "38:45",
    teacher: "ClaudyGodTeachings",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
    {
    id: 10,
    title: "Holiness: Jesus Expects Holiness from his body, Body of Christ ",
    thumbnail: ministry10,
    youtubeId: 'ghi789',
    scripture: "Nuggets for your Spiritual Growth",
    duration: "38:45",
    teacher: "ClaudyGodTeachings",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
   {
    id: 11,
    title: "How the Lord Expect us to Behave ",
    thumbnail: ministry11,
    youtubeId: 'ghi789',
    scripture: "Nuggets for your Spiritual Growth",
    duration: "38:45",
    teacher: "ClaudyGodTeachings",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 12,
    title: "How to indentify false Prophets",
    thumbnail: ministry12,
    youtubeId: 'ghi789',
    scripture: "Nuggets for your Spiritual Growth",
    duration: "38:45",
    teacher: "ClaudyGodTeachings",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
  {
    id: 13,
    title: "How to Start Living a Holy Life",
    thumbnail: ministry13,
    youtubeId: 'ghi789',
    scripture: "Nuggets for your Spiritual Growth",
    duration: "38:45",
    teacher: "ClaudyGodTeachings",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
    {
    id: 14,
    title: "Are we more concerned about our reputation or that we evangelize so that people can get a chance to repent",
    thumbnail: ministry14,
    youtubeId: 'ghi789',
    scripture: "Nuggets for your Spiritual Growth",
    duration: "38:45",
    teacher: "ClaudyGodTeachings",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
     {
    id: 15,
    title: "The Day of the Lord - According to the Book of Malachi",
    thumbnail: ministry15,
    youtubeId: 'ghi789',
    scripture: "Nuggets for your Spiritual Growth",
    duration: "38:45",
    teacher: "ClaudyGodTeachings",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
     {
    id: 16,
    title: "The Lord calls his people to come out of Babylon",
    thumbnail: ministry16,
    youtubeId: 'ghi789',
    scripture: "Help Series",
    duration: "38:45",
    teacher: "ClaudyGodTeachings",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
     {
    id: 17,
    title: "The truth you know will set you free",
    thumbnail: ministry17,
    youtubeId: 'ghi789',
    scripture: "Truth Series",
    duration: "38:45",
    teacher: "ClaudyGodTeachings",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
     {
    id: 18,
    title: "What's your Motive for Asking God for help?",
    thumbnail: ministry18,
    youtubeId: 'ghi789',
    scripture: "Help Series",
    duration: "38:45",
    teacher: "ClaudyGodTeachings",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
     {
    id: 19,
    title: "Who is Your Helper?",
    thumbnail: ministry19,
    youtubeId: 'ghi789',
    scripture: "Help Series",
    duration: "38:45",
    teacher: "ClaudyGodTeachings",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  },
     {
    id: 20,
    title: "Why is God Silent in certain Times and Season of our lives",
    thumbnail: ministry20,
    youtubeId: 'ghi789',
    scripture: "Nuggets for your Spiritual Growth",
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
      <h3 className="text-lg roboto-condensed text-gray-800">{content.title}</h3>
      <p className="text-sm text-purple-600 robotoMedium">{content.scripture}</p>
      <div className="flex justify-between raleway-slider text-sm text-gray-500">
        <span>{content.duration}</span>
        <span>{content.date}</span>
      </div>
      <p className="text-sm raleway-Light text-gray-700">{content.teacher}</p>
    </div>
  </div>
);

const ContentSection: React.FC<{
  title: string;
  description: string;
  contents: TeachingType[];
}> = ({ title, description, contents }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(3); // Desktop
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2); // Tablet
      } else {
        setItemsPerPage(1); // Mobile
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(contents.length / itemsPerPage);
  
  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);

  const visibleItems = contents.slice(
    currentSlide * itemsPerPage,
    (currentSlide + 1) * itemsPerPage
  );

  return (
    <div className="mt-16 space-y-8 px-4 max-w-7xl mx-auto">
      <div className="text-left">
        <h2 className="text-2xl md:text-4xl roboto-condensed text-purple-900">{title}</h2>
        <div className="w-[150px] h-2 bg-purple-900 my-4"></div>
        <p className="text-gray-600 robotoMedium text-base md:text-lg max-w-2xl">{description}</p>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {visibleItems.map(content => (
            <div key={content.id} className="w-full">
              <VideoCard
                content={content}
                isSelected={false}
                onClick={() => {}}
              />
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
          <div className="flex items-center  p-3 justify-between mt-6 md:mt-8">
          {/* Hide dots on mobile */}
          <div className="hidden   md:flex cursor-pointer justify-center w-full absolute left-0">
              <div className="flex space-x-2 ">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 w-6 md:w-8 cursor-pointer rounded-full transition-colors ${
                  index === currentSlide ? 'bg-purple-900' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          </div>

          <div className="flex items-center space-x-3 md:space-x-4">
            <button
              onClick={prevSlide}
              className="bg-purple-900 text-white p-1.5 cursor-pointer md:p-2 rounded-full hover:bg-purple-800 transition-colors"
              disabled={currentSlide === 0}
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <span className="text-sm md:text-base text-gray-600">
              {currentSlide + 1} / {totalSlides}
            </span>

            <button
              onClick={nextSlide}
              className="bg-purple-900 text-white p-1.5 md:p-2 rounded-full cursor-pointer  hover:bg-purple-800 transition-colors"
              disabled={currentSlide === totalSlides - 1}
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MinistryData: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="relative">
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
