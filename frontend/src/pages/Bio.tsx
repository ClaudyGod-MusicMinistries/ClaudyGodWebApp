import React from 'react';
import { Herosection } from '../components/Herosection';
import { About1, About2 } from '../assets';

export const Biography: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section with Enhanced Mobile Overlay */}
      <Herosection
        title="ClaudyGod Music & Ministries / Biography"
        backgroundImage={About1}
        className="relative"
      >
        <div className="absolute inset-0 bg-black/50 md:bg-black/40 z-10" />
      </Herosection>

      {/* Main Content with Improved Mobile Spacing */}
      <div className="max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="space-y-6 xs:space-y-7 sm:space-y-8 md:space-y-12">
          {/* Title with Better Mobile Line-height */}
         <h2 className="text-40 md:text-25 lg:text-45 text-purple-900 text-left roboto-condensed px-2 leading-tight sm:leading-snug md:leading-normal">
  ClaudyGod: American Gospel, African Soul - A Californian Melody of Faith
</h2>

          {/* First Section with Optimized Image Ratios */}
          <div className="flex flex-col md:flex-row gap-4 xs:gap-5 sm:gap-6 md:gap-8 lg:gap-10">
            <div className="md:w-2/3 space-y-3 xs:space-y-4 sm:space-y-5">
              <p className="text-gray-700 text-[15px] robotoMedium xs:text-base sm:text-[17px] md:text-lg leading-relaxed md:leading-loose">
                ClaudyGod is a California-based American Gospel artist of Nigerian and Sierra-Leonian descent. 
                Developing her passion for music through choral activities in Nigeria during middle and high school, 
                she received a divine message in 2003 during worship in Nashville: "I love your worship." This 
                pivotal moment led to her ministerial calling.
              </p>
              
              <p className="text-gray-700 text-[15px] xs:text-base robotoMedium sm:text-[17px] md:text-lg leading-relaxed md:leading-loose">
                Answering this call, she relocated to Tulsa, Oklahoma, attending Victory Bible Institute's 
                School of Worship. For years she served in various church ministries until 2018, when prayer 
                and fasting in California ignited her songwriting journey, resulting in her debut album 
                "Lord of My Heart" and six subsequent inspirational albums.
              </p>

              <p className="text-gray-700 text-[15px] xs:text-base robotoMedium sm:text-[17px] md:text-lg leading-relaxed md:leading-loose">
                Her discography including 'His Radiance', 'Classic Hymns', and 'Lover of My Soul' reflects 
                her mission to share God's love through music. "My purpose is wrapped in loving others," 
                ClaudyGod says, using her art to comfort those in need.
              </p>
            </div>

            <div className="md:w-1/3 aspect-[4/5] xs:aspect-[3/4] md:aspect-[5/6] mt-2 xs:mt-3 sm:mt-0">
              <img 
                src={About1} 
                alt="ClaudyGod portrait" 
                className="rounded-lg shadow-md w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* Second Section with Enhanced Tablet Layout */}
          <div className="flex flex-col md:flex-row-reverse gap-4 xs:gap-5 sm:gap-6 md:gap-8 lg:gap-10 mt-6 sm:mt-8 md:mt-12">
            <div className="md:w-2/3 space-y-3 xs:space-y-4 sm:space-y-5">
              <p className="text-gray-700 text-[15px] robotoMedium xs:text-base sm:text-[17px] md:text-lg leading-relaxed md:leading-loose">
                A multifaceted minister, ClaudyGod excels as a songwriter, evangelist, and worship leader. 
                Her music spans Contemporary Christian, Afro-gospel, Southern Gospel, and hymn arrangements. 
                Each composition shares personal testimonies and divine encounters, creating what she calls 
                "God-breathed art for spiritual connection."
              </p>

              <p className="text-gray-700 text-[15px] robotoMedium xs:text-base sm:text-[17px] md:text-lg leading-relaxed md:leading-loose">
                "These songs are my offering back to God," she shared in Nigerian television interviews. 
                Married to Dr. Kalu Okorie, they balance family life with four children and global ministry. 
                Her work continues to evolve, blending American gospel roots with African musical heritage 
                into what fans call "a healing melody for the soul."
              </p>
            </div>

            <div className="md:w-1/3 aspect-[4/5] xs:aspect-[3/4] md:aspect-[5/6] mt-2 xs:mt-3 sm:mt-0">
              <img 
                src={About2}
                alt="ClaudyGod performing" 
                className="rounded-lg shadow-md w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};