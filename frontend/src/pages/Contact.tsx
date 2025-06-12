import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Herosection } from '../components/Herosection';
import { Log } from '../assets/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';
import SuccessModal from '../components/contact/SuccessModal';

import NewsletterForm from '../components/Newsletter';

// Brand icons:
import {
  faFacebookF,
  faXTwitter,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';


import 'react-toastify/dist/ReactToastify.css';

type ContactFormInputs = {
  name: string;
  email: string;
  message: string;
};

export const ContactData: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useForm<ContactFormInputs>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

// Add to Bookings.tsx and ContactData.tsx
useEffect(() => {
  const checkBackendHealth = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/health`);
      const data = await res.json();
      console.log("Backend status:", data.status);
      console.log("Environment:", data.environment);
    } catch (error) {
      console.error("Backend connection failed:", error);
    }
  };
  checkBackendHealth();
}, []);

 return (
    <div className="bg-white relative">
      
      <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0  z-10" />
        <Herosection
          title="ClaudyGod Music & Ministries / Contact"
          backgroundImage={Log}
          className="relative rounded-2xl z-0"
        />
      </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl roboto-condensed text-purple-900 mb-6 inline-block px-4 md:px-16 py-2 md:py-4 border-b-2 border-purple-900">
            We Are Here For You
          </h2>
          <p className="text-gray-700 robotoMedium mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Please leave a prayer request, testimony or a comment...
          </p>
        </div>

        <h3 className="text-gray-900 mb-6 roboto-condensed text-2xl md:text-3xl lg:text-4xl">
          Get In Touch With Us
        </h3>
 <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-16 mb-16">
          <div className="md:pr-8">
            <ContactForm onSuccess={() => setIsModalOpen(true)} />
          </div>
          
          <div className="md:pl-8 md:border-l md:border-purple-200">
            <ContactInfo />
          </div>
        </div>
        <hr className="my-8 border-purple-900" />

        {/* Newsletter Form */}
        <NewsletterForm />
      </div>

      <div className="bg-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-3xl font-bold mb-4">ClaudyGod Music & Ministries</h2>
          <p className="text-lg mb-6">Connect With Us On Various Social Platforms</p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://www.facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-800 hover:bg-purple-700 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
              aria-label="Follow us on Facebook"
            >
              <FontAwesomeIcon icon={faFacebookF} className="text-white" />
            </a>

            <a
              href="https://x.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-800 hover:bg-purple-700 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
              aria-label="Follow us on X"
            >
              <FontAwesomeIcon icon={faXTwitter} className="text-white" />
            </a>

            <a
              href="https://www.instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-800 hover:bg-purple-700 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
              aria-label="Follow us on Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} className="text-white" />
            </a>

            <a
              href="https://www.youtube.com/yourchannel"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-800 hover:bg-purple-700 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
              aria-label="Follow us on YouTube"
            >
              <FontAwesomeIcon icon={faYoutube} className="text-white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
