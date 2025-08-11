import React, { useState } from 'react';
import { LightText, RegularText, SemiBoldText } from '../ui/fonts/typography';
import CustomButton from '../ui/fonts/buttons/CustomButton';
import { useTheme } from '../../contexts/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Modal from '../util/modals/CommunityModal';


const BlogWelcome: React.FC = () => {
  const { colorScheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <RegularText
        fontSize="clamp(1.5rem, 3vw, 2.75rem)"
        lineHeight="1.1"
        className="tracking-tight text-center md:text-left"
        color={colorScheme.background}
      >
        Welcome to <span style={{ color: colorScheme.primary }}>ClaudyGod Community</span>
      </RegularText>
      
      <LightText
        fontSize="1rem"
        lineHeight="1.75"
        className="text-center md:text-left"
        color={colorScheme.background}
      >
        This is a vibrant and uplifting community where we come together in faith to edify one another
        through the teachings of Christ. We are devoted to spiritual growth, mutual encouragement, and the sharing of 
        gospel-inspired materials. Whether through sermons, devotionals, worship music, or insightful discussions, we strive to build a
        Christ-centered atmosphere where every believer is empowered and equipped to walk boldly in their faith.
      </LightText>
      
      <div className="space-y-4">
        {[
          "Engage with thought-provoking content across diverse topics",
          "Share your perspectives and join meaningful discussions",
          "Connect with like-minded individuals passionate about learning"
        ].map((item, index) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colorScheme.primaryLight + '20' }}
              >
                <FontAwesomeIcon 
                  icon={faCheck} 
                  className="h-3 w-3" 
                  style={{ color: colorScheme.primary }}
                />
              </div>
            </div>
            <RegularText
              fontSize="0.875rem"
              className="ml-3"
              color={colorScheme.primary}
            >
              {item}
            </RegularText>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center md:justify-start">
        <CustomButton
          variant="primary"
          className="mt-6 px-6 py-3 transform hover:-translate-y-1 transition duration-300"
          style={{
            fontSize: '1.125rem',
            lineHeight: '1.75rem'
          }}
          onClick={() => setIsModalOpen(true)}
        >
          <SemiBoldText>Be Part of Our Community</SemiBoldText>
        </CustomButton>
      </div>

      {/* Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default BlogWelcome;