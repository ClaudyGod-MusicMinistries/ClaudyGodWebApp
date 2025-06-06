// pages/Biography.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Herosection } from '../components/Herosection';
import { About1, About2 } from '../assets';
import NewsletterForm from '../components/Newsletter';
import { BioSection } from '../components/Bio/BioSectio';

// Text content arrays for modularity
const firstSectionTexts = [
  "ClaudyGod is an American born, California-based Christian & Gospel music artist of both a Nigerian and Sierra-Leonian ancestry. Developing her passion for music through choral activities in Nigeria during middle and high school, she received a divine message from the lord in 2003 during worship in Nashville: \"I love your worship.\" This pivotal moment led to her ministerial calling.",
  "Answering this call, she relocated to Tulsa, Oklahoma, attending Victory Bible Institute's School of Worship. For years she served in various church ministries until 2018, when prayer and fasting in California ignited her songwriting journey, resulting in her debut album \"Lord of My Heart\" and six subsequent inspirational albums.",
  "Her discography including 'His Radiance', 'Classic Hymns', and 'Lover of My Soul' reflects her mission to share God's love through music. \"My purpose is wrapped in loving others,\" ClaudyGod says, using her art to comfort those in need."
];

const secondSectionTexts = [
  "Minister ClaudyGod excels as a songwriter, evangelist, and worship leader. Her music spans Contemporary Christian, Afro-gospel, Southern Gospel, and hymn arrangements. Each composition shares personal testimonies and divine encounters, creating what she calls \"God-breathed art for spiritual connection.\"",
  "\"These songs are my offering back to God,\" she shared in Nigerian television interviews. Married to Dr. Kalu Okorie, they balance family life with four children and global ministry. Her work continues to evolve, blending American gospel roots with African musical heritage into what fans call \"a healing melody for the soul.\""
];

export const Biography: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section with Enhanced Mobile Overlay and Animation */}
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

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-16">
        {/* Title with Better Mobile Line-height and Fade-in */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-md:text-2xl md:text-5xl lg:text-[45px] text-purple-900 text-left roboto-condensed px-2 leading-tight sm:leading-snug md:leading-normal"
        >
          ClaudyGod: American Contemporary Christian music and Afro-Gospel Songs
        </motion.h2>

        {/* First Bio Section */}
        <BioSection
          imageSrc={About2}
          altText="ClaudyGod portrait"
          texts={firstSectionTexts}
        />

        {/* Second Bio Section with image hidden on small screens */}
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
  );
};
