// components/tour/TourStatePage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faMapMarkerAlt,
  faUsers,
  faMusic,
} from '@fortawesome/free-solid-svg-icons';

// Tour data for each state
const getTourDataByState = (state: string) => {
  const tourData: { [key: string]: any } = {
    lagos: {
      title: 'Lagos Worship Tour 2024',
      description:
        "Experience the vibrant worship scene in Nigeria's commercial capital with transformative gospel events across Lagos.",
      image:
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=400&fit=crop',
      events: [
        {
          name: 'Lagos Worship Night',
          date: 'March 15, 2024',
          location: 'Tafawa Balewa Square, Lagos',
          description:
            'An evening of powerful worship with thousands of believers',
        },
        {
          name: 'Community Outreach',
          date: 'March 16, 2024',
          location: 'Makoko Community, Lagos',
          description:
            "Ministering hope and sharing God's love in underserved communities",
        },
        {
          name: 'Radio Ministry',
          date: 'March 17, 2024',
          location: 'Rainbow FM, Lagos',
          description: 'Live radio interview and worship session',
        },
      ],
      highlights: [
        'Mass Worship Gathering',
        'Community Impact',
        'Media Outreach',
      ],
    },
    abuja: {
      title: 'Abuja Capital Ministry Tour',
      description:
        "Bringing transformative worship to the heart of Nigeria's capital with strategic ministry events.",
      image:
        'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&h=400&fit=crop',
      events: [
        {
          name: 'Abuja Worship Convention',
          date: 'April 10, 2024',
          location: 'Eagle Square, Abuja',
          description:
            'National worship gathering with ministers from across Nigeria',
        },
        {
          name: 'Leadership Conference',
          date: 'April 11, 2024',
          location: 'Transcorp Hilton, Abuja',
          description: 'Equipping church leaders for effective ministry',
        },
        {
          name: 'Youth Worship Night',
          date: 'April 12, 2024',
          location: 'This Present House, Abuja',
          description: 'Dynamic worship experience for the next generation',
        },
      ],
      highlights: [
        'National Impact',
        'Leadership Development',
        'Youth Empowerment',
      ],
    },
    imo: {
      title: 'Imo State Revival Tour',
      description:
        'Igniting revival fires in Eastern Nigeria with powerful worship and community transformation.',
      image:
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
      events: [
        {
          name: 'Imo Revival Night',
          date: 'May 5, 2024',
          location: 'Heroes Square, Owerri',
          description: 'Night of miracles, healing, and spiritual awakening',
        },
        {
          name: 'Pastors Fellowship',
          date: 'May 6, 2024',
          location: 'All Saints Cathedral, Owerri',
          description: 'Strengthening pastoral unity in Imo State',
        },
        {
          name: 'Community Prayer Walk',
          date: 'May 7, 2024',
          location: 'Douglas Road, Owerri',
          description: 'Taking prayer to the streets of Owerri',
        },
      ],
      highlights: ['Revival Fire', 'Pastoral Unity', 'Community Prayer'],
    },
    'port-harcourt': {
      title: 'Port Harcourt Worship Experience',
      description:
        'Transformative worship encounters in the Garden City, reaching hearts with the gospel message.',
      image:
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop',
      events: [
        {
          name: 'Port Harcourt Worship',
          date: 'June 8, 2024',
          location: 'Yakubu Gowon Stadium, PH',
          description: 'Major worship gathering for the Niger Delta region',
        },
        {
          name: 'School Outreach',
          date: 'June 9, 2024',
          location: 'University of Port Harcourt',
          description: 'Ministering to students and academic community',
        },
        {
          name: 'TV Ministry Recording',
          date: 'June 10, 2024',
          location: 'NTA Port Harcourt',
          description: 'Recording worship sessions for television broadcast',
        },
      ],
      highlights: ['Regional Impact', 'Academic Ministry', 'Media Production'],
    },
    aba: {
      title: 'Aba Commercial City Tour',
      description:
        'Reaching the business community and marketplace in Aba with the gospel of Jesus Christ.',
      image:
        'https://images.unsplash.com/photo-1580327344181-c1163234e5a9?w=800&h=400&fit=crop',
      events: [
        {
          name: 'Marketplace Ministry',
          date: 'July 12, 2024',
          location: 'Ariaria International Market',
          description: 'Taking worship to business owners and traders',
        },
        {
          name: 'Business Leaders Breakfast',
          date: 'July 13, 2024',
          location: 'Crystal Park Hotel, Aba',
          description: 'Ministering to entrepreneurs and business leaders',
        },
        {
          name: 'Evening Worship Service',
          date: 'July 14, 2024',
          location: 'Abia State Polytechnic',
          description: 'Community worship service open to all',
        },
      ],
      highlights: [
        'Marketplace Evangelism',
        'Business Ministry',
        'Community Worship',
      ],
    },
  };

  return (
    tourData[state] || {
      title: `${state.charAt(0).toUpperCase() + state.slice(1)} Ministry Tour`,
      description:
        'Tour details and events are being finalized. Check back soon for updates!',
      image:
        'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=400&fit=crop',
      events: [],
      highlights: ['Details Coming Soon'],
    }
  );
};

export const TourStatePage: React.FC = () => {
  const { state } = useParams<{ state: string }>();
  const tourData = getTourDataByState(state || '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative h-64 md:h-80 bg-gray-900">
        <img
          src={tourData.image}
          alt={tourData.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2"
          >
            {tourData.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl opacity-90 max-w-3xl"
          >
            {tourData.description}
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Highlights */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Tour Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tourData.highlights.map((highlight: string, index: number) => (
              <motion.div
                key={highlight}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-lg p-4 shadow-md border border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faMusic}
                      className="text-purple-600 text-sm"
                    />
                  </div>
                  <span className="font-semibold text-gray-800">
                    {highlight}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Events */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Tour Events
          </h2>
          <div className="space-y-6">
            {tourData.events.length > 0 ? (
              tourData.events.map((event: any, index: number) => (
                <motion.div
                  key={event.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                          {event.name}
                        </h3>
                        <p className="text-gray-600 mb-4 text-lg">
                          {event.description}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <FontAwesomeIcon
                              icon={faCalendar}
                              className="text-purple-500"
                            />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FontAwesomeIcon
                              icon={faMapMarkerAlt}
                              className="text-purple-500"
                            />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                          Register Now
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-lg border border-gray-200">
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="text-4xl text-gray-400 mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Events Coming Soon
                </h3>
                <p className="text-gray-500">
                  We're finalizing the event details for this tour location.
                </p>
              </div>
            )}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Join Us on This Journey
            </h2>
            <p className="text-lg md:text-xl mb-6 opacity-90 max-w-2xl mx-auto">
              Be part of this transformative worship experience and witness
              God's power at work in {state}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                Volunteer for Event
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                Support Ministry
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default TourStatePage;
