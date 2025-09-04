// src/pages/CityHighlightsLayout.tsx
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExtraBoldText, RegularText } from '../ui/fonts/typography';
import CustomButton from '../ui/fonts/buttons/CustomButton';
import { useTheme } from '../../contexts/ThemeContext';

// Sample Data (replace with API later)
const cityData: Record<string, { description: string; highlights: string[] }> =
  {
    lagos: {
      description:
        'Lagos is the heartbeat of worship with powerful gatherings.',
      highlights: [
        'Eko Worship Night',
        'Lekki Youth Revival',
        'Island Praise Concert',
      ],
    },
    abuja: {
      description:
        'Abuja experienced a divine atmosphere of prayer and praise.',
      highlights: [
        'Unity Worship Abuja',
        'Central Park Praise',
        'City-wide Outreach',
      ],
    },
    imo: {
      description:
        'Imo witnessed a revival of hearts and strong community worship.',
      highlights: ['Owerri Revival Night', 'Imo Choir Fest'],
    },
    'port-harcourt': {
      description:
        'Port Harcourt overflowed with joy and thanksgiving in worship.',
      highlights: ['Rivers State Worship Festival', 'Garden City Praise'],
    },
    aba: {
      description:
        'Aba saw incredible testimonies of healing and transformation.',
      highlights: ['Aba Praise Explosion', 'Eastern Worship Gathering'],
    },
  };

export const CityHighlightsLayout = () => {
  const { city } = useParams<{ city: string }>();
  const { colorScheme } = useTheme();

  const cityInfo = cityData[city?.toLowerCase() || ''];

  if (!cityInfo) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen">
        <header className="text-center space-y-4">
          <ExtraBoldText fontSize="2rem" style={{ color: colorScheme.primary }}>
            City Not Found
          </ExtraBoldText>
          <RegularText style={{ color: colorScheme.textSecondary }}>
            Please go back and select a valid city.
          </RegularText>
        </header>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen w-full flex flex-col items-center"
      style={{ background: colorScheme.surface }}
    >
      <section className="flex flex-col flex-1 w-full max-w-6xl px-6 py-12">
        {/* Header */}
        <header className="flex flex-col items-center mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center max-w-3xl"
          >
            <ExtraBoldText
              fontSize="2rem"
              style={{ color: colorScheme.primary }}
              className="mb-4"
            >
              {city?.toUpperCase()} Worship Highlights
            </ExtraBoldText>

            <RegularText style={{ color: colorScheme.textSecondary }}>
              {cityInfo.description}
            </RegularText>
          </motion.div>
        </header>

        {/* Highlights Grid */}
        <section className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cityInfo.highlights.map((highlight, index) => (
              <motion.article
                key={index}
                whileHover={{ scale: 1.05 }}
                className="rounded-xl p-6 shadow-lg flex items-center justify-center text-center"
                style={{
                  backgroundColor: colorScheme.surfaceVariant,
                  border: `1px solid ${colorScheme.primary}`,
                  color: colorScheme.text,
                }}
              >
                {highlight}
              </motion.article>
            ))}
          </div>
        </section>

        {/* Footer Action */}
        <footer className="flex justify-center mt-12">
          <CustomButton
            style={{
              backgroundColor: colorScheme.primary,
              color: colorScheme.onPrimary,
            }}
            onClick={() => window.history.back()}
          >
            Back to Tour Cities
          </CustomButton>
        </footer>
      </section>
    </main>
  );
};
