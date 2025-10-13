import React, { useEffect, useState } from 'react';
import {
  ExtraBoldText,
  RegularText,
  SemiBoldText,
  BoldText,
} from '../ui/fonts/typography';
import CustomButton from '../ui/fonts/buttons/CustomButton';
import { useTheme } from '../../contexts/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faShareNodes,
  faEnvelope,
  faBookmark,
  faCalendar,
  faUser,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import {
  faTwitter,
  faFacebook,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { LayoutTemplate } from '../util/hero';
import { NewsletterForm } from '../util/Newsletter';
import { motion, AnimatePresence } from 'framer-motion';
import { Footer } from '../footer/footer';

interface ArticleDetailProps {
  post: {
    id: string;
    title: string;
    content: string;
    date: string;
    image: string;
    author?: string;
    category?: string;
    readTime?: string;
  };
  onClose: () => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ post, onClose }) => {
  const { colorScheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    setIsVisible(true);
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: 'Check out this article!',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing content:', error);
    }
  };

  const shareOnTwitter = () => {
    const text = `Check out this article: ${post.title}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  const shareViaEmail = () => {
    const subject = `Check out this article: ${post.title}`;
    const body = `I thought you might be interested in this article: ${window.location.href}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-white"
        >
          {/* Layout Template with Article Header as Hero */}
          <LayoutTemplate
            backgroundImage={post.image}
            overlayColor="rgba(0,0,0,0.6)"
            backgroundPosition="center center"
            className="h-[50vh] sm:h-[60vh] md:h-[65vh] lg:h-[70vh] min-h-[400px] w-full"
            title={''}
          >
            <div className="relative z-20 flex flex-col justify-end h-full pb-6 sm:pb-8 md:pb-10 lg:pb-12">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-center"
                >
                  {/* Category */}
                  {post.category && (
                    <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-4 sm:mb-5 md:mb-6">
                      <BoldText className="text-white text-sm">
                        {post.category}
                      </BoldText>
                    </div>
                  )}

                  {/* Title */}
                  <ExtraBoldText
                    fontSize="clamp(1.5rem, 6vw, 3rem)"
                    lineHeight="1.1"
                    className="mb-4 sm:mb-5 md:mb-6 text-white leading-tight px-2"
                    useThemeColor={false}
                  >
                    {post.title}
                  </ExtraBoldText>

                  {/* Meta Information */}
                  <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 text-white/90">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faCalendar} className="text-sm" />
                      <RegularText fontSize="0.9rem" useThemeColor={false}>
                        {formatDate(post.date)}
                      </RegularText>
                    </div>

                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faClock} className="text-sm" />
                      <RegularText fontSize="0.9rem" useThemeColor={false}>
                        {post.readTime || calculateReadTime(post.content)}
                      </RegularText>
                    </div>

                    {post.author && (
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faUser} className="text-sm" />
                        <RegularText fontSize="0.9rem" useThemeColor={false}>
                          {post.author}
                        </RegularText>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </LayoutTemplate>

          {/* Article Content */}
          <div className="bg-white min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16">
              {/* Two Column Layout for Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="flex flex-row justify-between items-center w-full mb-8 sm:mb-10 md:mb-12"
              >
                {/* Left Column - Back Button */}
                <div className="flex-shrink-0">
                  <CustomButton
                    variant="primary"
                    onClick={handleClose}
                    className="inline-flex items-center group whitespace-nowrap px-4 py-2.5 text-sm"
                  >
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                      className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform"
                    />
                    {/* Show "Back" on mobile, "Back to Articles" on sm screens and up */}
                    <SemiBoldText fontSize="0.9rem" className="sm:hidden">
                      Back
                    </SemiBoldText>
                    <SemiBoldText
                      fontSize="0.9rem"
                      className="hidden sm:inline"
                    >
                      Back to Articles
                    </SemiBoldText>
                  </CustomButton>
                </div>

                {/* Right Column - Share and Bookmark Buttons */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <CustomButton
                    variant="outline"
                    onClick={handleShare}
                    className="inline-flex items-center group whitespace-nowrap px-3 sm:px-4 py-2.5 text-sm"
                  >
                    <FontAwesomeIcon
                      icon={faShareNodes}
                      className="h-4 w-4 sm:mr-2 group-hover:scale-110 transition-transform"
                    />
                    <SemiBoldText
                      fontSize="0.9rem"
                      className="hidden sm:inline"
                    >
                      Share
                    </SemiBoldText>
                  </CustomButton>

                  <CustomButton
                    variant="outline"
                    onClick={toggleBookmark}
                    className="inline-flex items-center group whitespace-nowrap px-3 sm:px-4 py-2.5 text-sm"
                  >
                    <FontAwesomeIcon
                      icon={faBookmark}
                      className={`h-4 w-4 sm:mr-2 transition-all ${
                        isBookmarked
                          ? 'text-purple-600 fill-current'
                          : 'text-gray-600 group-hover:text-purple-600'
                      }`}
                    />
                    <SemiBoldText
                      fontSize="0.9rem"
                      className={`hidden sm:inline ${isBookmarked ? 'text-purple-600' : 'text-gray-600'}`}
                    >
                      {isBookmarked ? 'Saved' : 'Save'}
                    </SemiBoldText>
                  </CustomButton>
                </div>
              </motion.div>

              {/* Article Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="prose prose-sm sm:prose-base md:prose-lg max-w-none mb-10 sm:mb-12 md:mb-14 lg:mb-16"
              >
                <div
                  className="article-content text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: post.content,
                  }}
                  style={{
                    fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                    lineHeight: '1.6',
                  }}
                />
              </motion.div>

              {/* Social Sharing Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 mb-10 sm:mb-12 md:mb-14 lg:mb-16"
              >
                <div className="text-center mb-4 sm:mb-5 md:mb-6">
                  <SemiBoldText
                    fontSize="clamp(1rem, 4vw, 1.25rem)"
                    className="text-gray-800 mb-2"
                  >
                    Share This Article
                  </SemiBoldText>
                  <RegularText className="text-gray-600 text-base">
                    Help spread the message by sharing with others
                  </RegularText>
                </div>

                <div className="flex justify-center gap-3 sm:gap-4">
                  {[
                    {
                      icon: faTwitter,
                      label: 'Twitter',
                      action: shareOnTwitter,
                      color: 'text-blue-400',
                    },
                    {
                      icon: faFacebook,
                      label: 'Facebook',
                      action: shareOnFacebook,
                      color: 'text-blue-600',
                    },
                    {
                      icon: faLinkedin,
                      label: 'LinkedIn',
                      action: shareOnLinkedIn,
                      color: 'text-blue-700',
                    },
                    {
                      icon: faEnvelope,
                      label: 'Email',
                      action: shareViaEmail,
                      color: 'text-gray-600',
                    },
                  ].map(social => (
                    <CustomButton
                      key={social.label}
                      variant="icon"
                      onClick={social.action}
                      aria-label={`Share on ${social.label}`}
                      className="p-3 sm:p-4 rounded-xl bg-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      <FontAwesomeIcon
                        icon={social.icon}
                        className={`h-5 w-5 ${social.color}`}
                      />
                    </CustomButton>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Newsletter Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12 md:mb-14 lg:mb-16">
              <NewsletterForm
                title="Stay Updated with Our Ministry"
                description="Get the latest articles, insights, and ministry updates delivered to your inbox."
                className="rounded-xl sm:rounded-2xl shadow-lg"
              />
            </div>

            {/* Footer */}
            <Footer />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArticleDetail;
