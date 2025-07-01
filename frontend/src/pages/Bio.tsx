// src/components/Bio/Biography.tsx
import { SEO } from '../components/util/SEO';
import React from 'react';
import { motion } from 'framer-motion';
import { Herosection } from '../components/util/Herosection';
import { About1, About2 } from '../assets';
import {NewsletterForm} from '../components/util/Newsletter';
import { BioSection } from '../components/Bio/BioSectio';
import { firstSectionTexts, secondSectionTexts } from '../components/data/Biography';


export const Biography: React.FC = () => {
  return (
    <>
      <SEO
        title="ClaudyGod Biography - American Gospel Artist & Ministry Leader"
        description="Discover ClaudyGod's journey from Nigeria to becoming a California-based gospel artist. Learn about her music ministry, albums, and family life."
        keywords="claudygod biography, gospel artist bio, christian musician, worship leader, american gospel artist"
        canonical="https://claudygod.org/biography"
        image="https://claudygod.org/images/bio-og.jpg"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "ClaudyGod",
          "url": "https://claudygod.org/biography",
          "image": "https://claudygod.org/images/claudygod-profile.jpg",
          "sameAs": [
            "https://www.instagram.com/singerclaudygod/?hl=en",
            "https://www.youtube.com/@ClaudyGODMinistries",
            "https://www.facebook.com/ClaudyGod/",
            "https://twitter.com/claudygod",
            "https://www.linkedin.com/in/claudygod-music-and-ministries-b2887094",
            "https://www.tiktok.com/@claudygod",
            "https://music.apple.com/ng/artist/claudygod/1440081695",
            "https://www.youtube.com/channel/UC0RUDNzIiSLxoWGcNQbrLNQ",
            "https://music.youtube.com/channel/UCBZR8mELmaD5EpyuKMFUlaw",
            "https://www.deezer.com/artist/53266602"
          ],
          "description": "American Gospel artist and worship leader",
          "birthPlace": "Nigeria",
          "birthDate": "1975-01-01",
          "alumniOf": "Victory Bible Institute",
          "award": ["Gospel Music Awards"],
          "genre": ["Gospel", "Contemporary Christian", "Afro-gospel"]
        }}
      />
      <div className="bg-white">
        <Herosection
          title="ClaudyGod Music & Ministries / Biography"
          backgroundImage={About1}
          className="relative"
        >
          <div className="absolute inset-0 bg-black/50 md:bg-black/40 z-10" />
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex items-center justify-center text-white text-3xl md:text-5xl font-bold z-20"
          >
            ClaudyGod Music & Ministries
          </motion.h2>
        </Herosection>

        <div className="max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-md:text-2xl md:text-5xl lg:text-[45px] text-purple-900 text-left roboto-condensed px-2 leading-tight sm:leading-snug md:leading-normal"
          >
            ClaudyGod: American Contemporary Christian music and Afro-Gospel Songs
          </motion.h2>
          <BioSection
            imageSrc={About2}
            altText="ClaudyGod portrait"
            texts={firstSectionTexts}
          />
          <BioSection
            imageSrc={About2}
            altText="ClaudyGod performing"
            texts={secondSectionTexts}
            reverse
            hideOnSmall
          />
        </div>

        <hr className="my-8 border-purple-900" />

        <NewsletterForm />
      </div>
    </>
  );
};