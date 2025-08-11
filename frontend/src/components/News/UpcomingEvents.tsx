import { motion } from 'framer-motion';
import { newsBanner } from '../../assets/';
import { ExtraBoldText, RegularText } from '../ui/fonts/typography';
import CustomButton from '../ui/fonts/buttons/CustomButton';
import { useTheme } from '../../contexts/ThemeContext';

interface UpcomingEvent {
  date: string;
  title: string;
  location: string;
}

const events: UpcomingEvent[] = [
  {
    date: '22nd December 2024',
    title: 'ONE MILLION MAN WORSHIP',
    location: 'Yakubu Gowon Stadium, Elekahia, Port Harcourt',
  },
  {
    date: '31st December 2024',
    title: 'OPENS HEAVENS CALGARY 2024',
    location: 'BMO Centre: 338-13 A/ENUE SE, Calgary, Canada',
  },
];

export const UpcomingEvents = () => {
  const { colorScheme } = useTheme();

  return (
    <div 
      className="w-full py-16"
      style={{
        background: `linear-gradient(to bottom, ${colorScheme.background}, ${colorScheme.surfaceVariant})`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ExtraBoldText 
              fontSize="2rem"
              mdFontSize="4rem"
              lgFontSize="5rem"
              style={{ color: colorScheme.text }}
            >
              Upcoming Events
            </ExtraBoldText>
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '8rem' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 mx-auto my-6"
            style={{ backgroundColor: colorScheme.primary }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-6 rounded-lg"
              style={{ 
                backgroundColor: `${colorScheme.primary}30`,
                backdropFilter: 'blur(8px)'
              }}
            >
              <RegularText 
                fontSize="1.25rem"
                style={{ color: colorScheme.accent }}
                className="mb-2"
              >
                {event.date}
              </RegularText>
              <ExtraBoldText 
                fontSize="1.5rem"
                style={{ color: colorScheme.text }}
                className="mb-3"
              >
                {event.title}
              </ExtraBoldText>
              <RegularText style={{ color: colorScheme.textSecondary }}>
                {event.location}
              </RegularText>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-full rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={newsBanner}
              alt="Nigeria Tour"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <ExtraBoldText 
              fontSize="2rem"
              mdFontSize="3rem"
              lgFontSize="3.5rem"
              style={{ color: colorScheme.text }}
              className="mb-6"
            >
              Min. ClaudyGod Visits Nigeria
            </ExtraBoldText>
            <RegularText 
              fontSize="1.125rem"
              mdFontSize="1.25rem"
              style={{ color: colorScheme.textSecondary }}
              className="mb-8"
            >
              Min. ClaudyGod will be sharing the love of God through music in 5 different
              states in Nigeria.
            </RegularText>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              {['Lagos', 'Aba', 'Owerri', 'Portharcourt', 'Abuja'].map((city) => (
                <CustomButton
                  key={city}
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    /* will be wired up in News.tsx via props */
                  }}
                >
                  {city}
                </CustomButton>
              ))}
            </div>
            <a 
              href="#" 
              className="transition-colors"
              style={{ color: colorScheme.accent }}
            >
              Read more about the tour &rarr;
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};