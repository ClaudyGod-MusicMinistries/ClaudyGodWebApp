/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/tour/CityTourLayout.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import {
  ExtraBoldText,
  RegularText,
  SemiBoldText,
} from '../ui/fonts/typography';

interface CityTourLayoutProps {
  city: string;
  heroImage: string;
  description: string;
  children: React.ReactNode;
  highlights: string[];
  testimonies?: string[];
  upcomingEvents?: string[];
  worshipVenues?: string[];
  featuredVideo?: string;
}

export const CityTourLayout: React.FC<CityTourLayoutProps> = ({
  city,
  heroImage,
  description,
  children,
  highlights,
  testimonies = [],
  upcomingEvents = [],
  worshipVenues = [],
  featuredVideo,
}) => {
  const { colorScheme } = useTheme();

  return (
    <main
      className="min-h-screen w-full"
      style={{ background: colorScheme.background }}
    >
      {/* Hero Section */}
      <section className="relative h-80 sm:h-96 lg:h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <ExtraBoldText
              fontSize="2.5rem"
              lgFontSize="3.5rem"
              style={{ color: '#ffffff' }}
              className="mb-4"
            >
              {city.toUpperCase()} WORSHIP TOUR
            </ExtraBoldText>
            <RegularText
              style={{ color: '#ffffff' }}
              className="text-lg lg:text-xl max-w-2xl mx-auto"
            >
              {description}
            </RegularText>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12">{children}</div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Highlights */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl p-6 shadow-lg"
              style={{ backgroundColor: colorScheme.surface }}
            >
              <SemiBoldText
                fontSize="1.5rem"
                style={{ color: colorScheme.primary }}
                className="mb-4"
              >
                Tour Highlights
              </SemiBoldText>
              <ul className="space-y-3">
                {highlights.map((highlight, index) => (
                  <li
                    key={index}
                    className="flex items-start"
                    style={{ color: colorScheme.text }}
                  >
                    <span
                      className="mr-3 mt-1 flex-shrink-0 w-2 h-2 rounded-full"
                      style={{ backgroundColor: colorScheme.primary }}
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
              <motion.section
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl p-6 shadow-lg"
                style={{ backgroundColor: colorScheme.surface }}
              >
                <SemiBoldText
                  fontSize="1.5rem"
                  style={{ color: colorScheme.primary }}
                  className="mb-4"
                >
                  Upcoming Events
                </SemiBoldText>
                <ul className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <li
                      key={index}
                      className="p-3 rounded-lg"
                      style={{
                        backgroundColor: colorScheme.surfaceVariant,
                        color: colorScheme.text,
                      }}
                    >
                      {event}
                    </li>
                  ))}
                </ul>
              </motion.section>
            )}

            {/* Worship Venues */}
            {worshipVenues.length > 0 && (
              <motion.section
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-2xl p-6 shadow-lg"
                style={{ backgroundColor: colorScheme.surface }}
              >
                <SemiBoldText
                  fontSize="1.5rem"
                  style={{ color: colorScheme.primary }}
                  className="mb-4"
                >
                  Worship Venues
                </SemiBoldText>
                <ul className="space-y-2">
                  {worshipVenues.map((venue, index) => (
                    <li
                      key={index}
                      style={{ color: colorScheme.textSecondary }}
                      className="text-sm"
                    >
                      • {venue}
                    </li>
                  ))}
                </ul>
              </motion.section>
            )}
          </div>
        </div>

        {/* Testimonies Section */}
        {testimonies.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16"
          >
            <SemiBoldText
              fontSize="2rem"
              style={{ color: colorScheme.primary }}
              className="text-center mb-8"
            >
              Testimonies from {city}
            </SemiBoldText>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonies.map((testimony, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="rounded-xl p-6 text-center"
                  style={{
                    backgroundColor: colorScheme.surface,
                    border: `2px solid ${colorScheme.primary}`,
                  }}
                >
                  <RegularText style={{ color: colorScheme.text }}>
                    "{testimony}"
                  </RegularText>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </section>
    </main>
  );
};
