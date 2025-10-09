import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faHeadphones } from '@fortawesome/free-solid-svg-icons';
import { LightText, SemiBoldText } from '../components/ui/fonts/typography/';

export const TopBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  const closeBanner = () => setIsVisible(false);

  if (!isVisible) return null;

  return (
    <div className="w-full bg-purple-900 text-white overflow-hidden">
      {/* Desktop Banner */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2">
            <div className="flex-1 overflow-hidden">
              <LightText
                className="text-white text-[13px] leading-tight font-light whitespace-nowrap tracking-wide"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Add{' '}
                <SemiBoldText
                  className="text-white inline font-semibold"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  ClaudyGod Music Ministry
                </SemiBoldText>{' '}
                to your playlist and stream across all platforms for uplifting
                gospel sounds.
              </LightText>
            </div>

            <button
              onClick={() => {
                /* Add streaming modal trigger */
              }}
              className="flex items-center space-x-1 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-200 border border-white/30 ml-4"
            >
              <FontAwesomeIcon
                icon={faHeadphones}
                className="text-white text-xs"
              />
              <LightText
                className="text-white text-[12px] font-medium"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Listen Now
              </LightText>
            </button>
          </div>
        </div>
      </div>

      {/* Medium Banner */}
      <div className="hidden md:block lg:hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center py-2 relative">
            <LightText
              className="text-white text-[12px] text-center leading-tight font-light tracking-wide whitespace-nowrap"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Add{' '}
              <SemiBoldText
                className="text-white inline font-semibold"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                ClaudyGod Music Ministry
              </SemiBoldText>{' '}
              to your playlist and stream across all platforms.
            </LightText>

            <button
              onClick={closeBanner}
              className="p-1 hover:bg-white/20 rounded-full transition-colors duration-200 absolute right-4"
              aria-label="Close banner"
            >
              <FontAwesomeIcon icon={faTimes} className="text-white text-xs" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
