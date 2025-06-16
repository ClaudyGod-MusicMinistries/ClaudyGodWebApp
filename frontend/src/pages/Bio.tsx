// pages/Biography.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Herosection } from '../components/Utils/Herosection';
import { About1, About2 } from '../assets';
import NewsletterForm from '../components/Utils/Newsletter';
import { BioSection } from '../components/Bio/BioSectio';

const firstSectionTexts = [
  `ClaudyGod is a California-based, American Gospel Artiste. She however has both a Nigerian and Sierraleonian
   descent and spent a good amount of her childhood in Nigeria. While growing up in Nigeria, 
  ClaudyGod nursed a passion for music, participating in choral activities in both middle and high school.  
During a session of fellowship with God in Nashville USA in 2003, She heard God say to her “I love your 
worship.” This she treasured in her heart. These words were so impressionable that she logged this into 
her existing diary. She would often hear these repeated during times of praise and worship to God in her 
daily devotion and prayer time but wasn’t very certain of its full implication. 
She then felt called to ministry in 2003.  As a result of this calling, she obediently relocated to Tulsa, 
Oklahoma (USA) within that same year with the intent to attend a Christian college. She attended the 
School of Worship of Victory Bible Institute, which she had become a member of at the time. ClaudyGod 
continued to walk closely with the Lord and served in different capacities in the church including the 
worship team, home cell groups, children's ministry, and choir.
Several years later, in January of 2018, while living in California, She was divinely motivated to write 
songs after a time of fasting and praying for the New Year. This move of God led to the unleashing of her 
debut passion-filled album “Lord of My Heart.” Now she has released seven albums — ‘His Radiance’,  
‘Classic Hymns’,  ‘King of Heaven’,  ‘Lover of my Soul’,  ‘Very Glorious’, and  ‘Father Christmas’. She has 
always known she has a great purpose and that her purpose is wrapped around loving others. Through 
these received God-inspired songs, she shares God’s love with a lost and suffering world. `
];

const secondSectionTexts = [
  `ClaudyGod is not just a phenomenal minister of the Gospel of Jesus Christ, she is also a highly 
accomplished songwriter, Evangelist and worship leader who has served and is still serving in the music 
ministry, and her songs come in diverse  Gospel music genres honoring God in Worship & Praise. She has 
also written and produced other forms of music including, Contemporary Christian music, Southern 
Gospel, Praise/Worship Music, Afro-gospel (Nigerian music), Christian Rhyme (Rap),  Covered Hymns, 
Christmas songs and many more. Her music has been designed to tell of her appreciation of God’s 
passionate affection for her; the amazing things He has done in her life and the great testimonies she 
has witnessed in the life of others. Each of her songs is grounded in honoring God as well as has its own 
unique message to her esteemed audience. 
She has said in her interview with some of the prestigious TV stations during her visit to Nigeria that,"my 
songs are simply God-breathed. I would never come up with songs on my own. I have written these 
songs to give back to God what He has so generously given to me. My passion is to share what God has 
graciously shared with me, with the world. You are welcome to be a part of this.  
Minister ClaudyGod is happily married to Dr. Kalu Okorie and they are blessed with four lovely 
children.`
];

export const Biography: React.FC = () => {
  return (
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
  );
};
