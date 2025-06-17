import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Herosection } from '../components/Utils/Herosection';
// import { HelpBg } from '../assets';
import NewsletterForm from '../components/Utils/Newsletter';

const faqs = [
  {
    question: 'How do I play a video?',
    answer: 'Click on any thumbnail to open the video player modal. Use playback controls at the bottom to play, pause, or change volume.'
  },
  {
    question: 'Why is my thumbnail not loading?',
    answer: 'We load a default-quality thumbnail first. If you still encounter issues, refresh the page or check your network connection.'
  },
  {
    question: 'How can I contact support?',
    answer: 'Use the contact form at the bottom of this page or send us an email at support@claudygod.com.'
  },
  {
    question: 'How often is content updated?',
    answer: 'We add new videos and articles every week. Subscribe to our newsletter to stay informed.'
  }
];

export const FeedBack: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white">
      <Herosection
        title="Help & Support"
        backgroundImage={HelpBg}
        className="relative"
      >
        <div className="absolute inset-0 bg-black/50 z-10" />
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex items-center justify-center text-white text-3xl md:text-5xl font-bold z-20"
        >
          Need Assistance?
        </motion.h2>
      </Herosection>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl text-purple-900 font-semibold mb-6 text-center"
        >
          Frequently Asked Questions
        </motion.h3>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="border border-gray-200 rounded-lg"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full text-left px-4 py-3 flex justify-between items-center focus:outline-none"
              >
                <span className="text-purple-900 font-medium">{faq.question}</span>
                <span className="text-gray-500">
                  {openIndex === idx ? '−' : '+'}
                </span>
              </button>
              {openIndex === idx && (
                <div className="px-4 pb-4 text-gray-700">
                  {faq.answer}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <motion.h4
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xl text-purple-900 font-semibold mb-4"
          >
            Still need help?
          </motion.h4>
          <form className="max-w-lg mx-auto space-y-4">
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="message">Message</label>
              <textarea
                id="message"
                rows={4}
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-purple-900 text-white rounded-full hover:bg-purple-800 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <hr className="my-8 border-purple-900" />
      <NewsletterForm />
    </div>
  );
};
