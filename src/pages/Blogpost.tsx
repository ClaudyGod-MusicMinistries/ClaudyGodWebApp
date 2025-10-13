/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useState,
  useEffect,
  lazy,
  Suspense,
  useCallback,
  useMemo,
  memo,
  useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookOpen,
  faChevronLeft,
  faChevronRight,
  faPlay,
  faSearch,
  faFilter,
  faFeather,
  faCheck,
  faCalendar,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

// Import components directly for better TypeScript compatibility
import { SEO } from '../components/util/SEO';
import { LayoutTemplate } from '../components/util/hero';
import { NewsletterForm } from '../components/util/Newsletter';
import { DonationCallToAction } from '../components/util/DonationSupport';
import { openArticle, closeArticle } from '../store/blogs';
import { setCurrentVideo } from '../store/interviewSlice';
import { RootState } from '../store/store';
import {
  RegularText,
  LightText,
  BoldText,
  SemiBoldText,
  AbrilFatFaceText,
  BricolageText,
} from '../components/ui/fonts/typography';
import CustomButton from '../components/ui/fonts/buttons/CustomButton';
import Modal from '../components/util/modals/CommunityModal';
import { blog } from '../assets';

// Import data directly
import { blogPosts } from '../components/blog/blogsData';
import { videos } from '../components/data/InterviewData';

// Lazy load only heavy components with proper TypeScript handling
const LazyVideoPlayerModal = lazy(() =>
  import('../components/blog/VideoPlayer').then(
    module =>
      ({
        default: module.default,
      }) as { default: React.ComponentType<any> }
  )
);

const LazyArticleDetail = lazy(() =>
  import('../components/blog/Article').then(
    module =>
      ({
        default: module.default,
      }) as { default: React.ComponentType<any> }
  )
);

const LazyChatbot = lazy(() =>
  import('../components/Chatbot').then(
    module =>
      ({
        default: module.default,
      }) as { default: React.ComponentType<any> }
  )
);

// Skeleton loaders
const ArticleDetailSkeleton = () => (
  <div className="w-full h-full flex items-center justify-center bg-white/95 backdrop-blur-lg">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <RegularText className="text-base">Loading article...</RegularText>
    </div>
  </div>
);

const VideoPlayerSkeleton = () => (
  <div className="w-full h-full flex items-center justify-center bg-black/95">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <RegularText className="text-base text-white">
        Loading video...
      </RegularText>
    </div>
  </div>
);

const ChatbotSkeleton = () => (
  <div className="w-14 h-14 rounded-full animate-pulse bg-white/70" />
);

// Interfaces
interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  image?: string;
  excerpt?: string;
  author?: string;
  category?: string;
}

// BlogWelcome Component without modal state
const BlogWelcome: React.FC<{ onOpenModal: () => void }> = ({
  onOpenModal,
}) => {
  const { colorScheme } = useTheme();

  return (
    <div className="space-y-6">
      <RegularText
        fontSize="clamp(1.5rem, 3vw, 2.75rem)"
        lineHeight="1.1"
        className="tracking-tight text-left"
        color={colorScheme.background}
      >
        Welcome to{' '}
        <span style={{ color: colorScheme.primary }}>ClaudyGod Community</span>
      </RegularText>

      <LightText
        fontSize="clamp(0.875rem, 1.5vw, 1rem)"
        lineHeight="1.75"
        className="text-left leading-relaxed"
        color={colorScheme.background}
      >
        This is a vibrant and uplifting community where we come together in
        faith to edify one another through the teachings of Christ. We are
        devoted to spiritual growth, mutual encouragement, and the sharing of
        gospel-inspired materials. Whether through sermons, devotionals, worship
        music, or insightful discussions, we strive to build a Christ-centered
        atmosphere where every believer is empowered and equipped to walk boldly
        in their faith.
      </LightText>

      <div className="space-y-4">
        {[
          'Engage with thought-provoking content across diverse topics',
          'Share your perspectives and join meaningful discussions',
          'Connect with like-minded individuals passionate about learning',
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
              className="ml-3 text-left"
              color={colorScheme.primary}
            >
              {item}
            </RegularText>
          </div>
        ))}
      </div>

      <div className="flex justify-start">
        <CustomButton
          variant="primary"
          className="mt-6 px-8 py-4 transform hover:-translate-y-1 transition duration-300 hover:shadow-lg"
          style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
            lineHeight: '1.75rem',
          }}
          onClick={onOpenModal}
        >
          <SemiBoldText>Be Part of Our Community</SemiBoldText>
        </CustomButton>
      </div>
    </div>
  );
};

// Professional Blog Posts Header Component
const BlogPostsHeader = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.7, delay: 0.2 }}
    className="text-center w-full mb-6 md:mb-8 px-4"
  >
    {/* Decorative Icon */}
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, type: 'spring' }}
      className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 mb-4 border border-purple-200/50"
    >
      <FontAwesomeIcon icon={faFeather} className="text-2xl text-purple-600" />
    </motion.div>

    {/* Main Heading */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mb-3"
    >
      <AbrilFatFaceText
        style={{
          color: '#2D3748',
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          lineHeight: '1.1',
        }}
        useThemeColor={false}
      >
        Featured Writings
      </AbrilFatFaceText>
    </motion.div>

    {/* Subheading */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mb-4"
    >
      <BricolageText
        style={{
          color: '#4A5568',
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          lineHeight: '1.4',
          fontWeight: '500',
        }}
        useThemeColor={false}
      >
        Dive into our collection of spiritual insights and ministry reflections
      </BricolageText>
    </motion.div>

    {/* Stats Section */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="flex flex-wrap justify-center gap-4 md:gap-8 mt-6"
    >
      <div className="text-center">
        <BoldText className="text-xl md:text-2xl text-purple-600 mb-1">
          {blogPosts.length}+
        </BoldText>
        <LightText className="text-xs text-gray-600 uppercase tracking-wide">
          Articles
        </LightText>
      </div>
      <div className="text-center">
        <BoldText className="text-xl md:text-2xl text-pink-500 mb-1">
          {
            new Set(blogPosts.map(post => new Date(post.date).getFullYear()))
              .size
          }
        </BoldText>
        <LightText className="text-xs text-gray-600 uppercase tracking-wide">
          Years
        </LightText>
      </div>
      <div className="text-center">
        <BoldText className="text-xl md:text-2xl text-blue-500 mb-1">
          100%
        </BoldText>
        <LightText className="text-xs text-gray-600 uppercase tracking-wide">
          Faith-Based
        </LightText>
      </div>
    </motion.div>
  </motion.div>
));

// Blog Post Card Component
const BlogPostCard = memo(
  ({
    post,
    onSelect,
  }: {
    post: BlogPost;
    onSelect: (postId: string) => void;
  }) => (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer"
      onClick={() => onSelect(post.id)}
    >
      {/* Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-purple-50 to-pink-50 overflow-hidden">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FontAwesomeIcon
              icon={faBookOpen}
              className="text-4xl text-purple-300 group-hover:text-purple-400 transition-colors"
            />
          </div>
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Category Tag */}
        {post.category && (
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium mb-3">
            {post.category}
          </div>
        )}

        {/* Title */}
        <BoldText className="text-lg mb-2 text-gray-800 line-clamp-2 group-hover:text-purple-600 transition-colors leading-tight">
          {post.title}
        </BoldText>

        {/* Excerpt */}
        <RegularText className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {post.excerpt || post.content.substring(0, 150)}...
        </RegularText>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faCalendar} className="text-xs" />
              <span>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
            {post.author && (
              <div className="flex items-center gap-1">
                <FontAwesomeIcon icon={faUser} className="text-xs" />
                <span>{post.author}</span>
              </div>
            )}
          </div>
        </div>

        {/* Read More Button */}
        <button
          className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium text-sm hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group/btn"
          onClick={e => {
            e.stopPropagation();
            onSelect(post.id);
          }}
        >
          Read Article
          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-xs group-hover/btn:translate-x-1 transition-transform"
          />
        </button>
      </div>
    </motion.article>
  )
);

// Mobile Navigation Component for Blog Posts
const MobilePostsNavigation = memo(
  ({
    currentPosts,
    currentIndex,
    onNavigate,
    onSelect,
  }: {
    currentPosts: BlogPost[];
    currentIndex: number;
    onNavigate: (index: number) => void;
    onSelect: (postId: string) => void;
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleNavigate = useCallback(
      (index: number) => {
        onNavigate(index);
        // Scroll the container into view smoothly
        setTimeout(() => {
          containerRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
          });
        }, 100);
      },
      [onNavigate]
    );

    return (
      <div ref={containerRef} className="lg:hidden w-full space-y-6 px-4">
        {/* Current Post Display */}
        <BlogPostCard post={currentPosts[currentIndex]} onSelect={onSelect} />

        {/* Navigation Controls */}
        <div className="flex justify-between items-center px-1">
          <button
            onClick={() => handleNavigate(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-all text-sm font-medium shadow-sm"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-3">
            <LightText className="text-sm text-gray-600">
              {currentIndex + 1} / {currentPosts.length}
            </LightText>
            <div className="flex gap-1">
              {currentPosts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigate(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentIndex === index
                      ? 'bg-purple-600 w-4'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={() => handleNavigate(currentIndex + 1)}
            disabled={currentIndex === currentPosts.length - 1}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-all text-sm font-medium shadow-sm"
          >
            <span>Next</span>
            <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
          </button>
        </div>
      </div>
    );
  }
);

// Desktop Posts Grid Component
const DesktopPostsGrid = memo(
  ({
    currentPosts,
    onSelect,
  }: {
    currentPosts: BlogPost[];
    onSelect: (postId: string) => void;
  }) => (
    <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-4">
      {currentPosts.map((post, index) => (
        <BlogPostCard key={post.id} post={post} onSelect={onSelect} />
      ))}
    </div>
  )
);

// Medium Screen Posts Grid (3 cards with navigation)
const MediumScreenPostsGrid = memo(
  ({
    currentPosts,
    currentIndex,
    onNavigate,
    onSelect,
  }: {
    currentPosts: BlogPost[];
    currentIndex: number;
    onNavigate: (index: number) => void;
    onSelect: (postId: string) => void;
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const postsToShow = currentPosts.slice(currentIndex, currentIndex + 3);

    const handleNavigate = useCallback(
      (index: number) => {
        onNavigate(index);
        // Smooth scroll to maintain user position
        setTimeout(() => {
          containerRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
          });
        }, 100);
      },
      [onNavigate]
    );

    return (
      <div
        ref={containerRef}
        className="hidden md:block lg:hidden w-full space-y-6 px-4"
      >
        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {postsToShow.map((post, index) => (
            <BlogPostCard key={post.id} post={post} onSelect={onSelect} />
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center px-4">
          <button
            onClick={() => handleNavigate(currentIndex - 3)}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-all text-sm font-medium shadow-sm"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
            <span>Previous 3</span>
          </button>

          <div className="flex items-center gap-3">
            <LightText className="text-sm text-gray-600">
              Showing {currentIndex + 1}-
              {Math.min(currentIndex + 3, currentPosts.length)} of{' '}
              {currentPosts.length}
            </LightText>
            <div className="flex gap-1">
              {Array.from(
                { length: Math.ceil(currentPosts.length / 3) },
                (_, i) => (
                  <button
                    key={i}
                    onClick={() => handleNavigate(i * 3)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentIndex === i * 3
                        ? 'bg-purple-600 w-4'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                )
              )}
            </div>
          </div>

          <button
            onClick={() => handleNavigate(currentIndex + 3)}
            disabled={currentIndex + 3 >= currentPosts.length}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-all text-sm font-medium shadow-sm"
          >
            <span>Next 3</span>
            <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
          </button>
        </div>
      </div>
    );
  }
);

// Mobile Navigation for Interview Videos
const MobileInterviewNavigation = memo(
  ({
    currentVideos,
    currentIndex,
    onNavigate,
    onVideoClick,
  }: {
    currentVideos: typeof videos;
    currentIndex: number;
    onNavigate: (index: number) => void;
    onVideoClick: (video: any) => void;
  }) => {
    const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>(
      {}
    );

    const handleImageError = useCallback((videoId: string) => {
      setImageErrors(prev => ({ ...prev, [videoId]: true }));
    }, []);

    const getThumbnailUrl = useCallback(
      (videoId: string) => {
        if (imageErrors[videoId]) {
          return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
        }
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      },
      [imageErrors]
    );

    return (
      <div className="lg:hidden w-full space-y-6 px-4">
        {/* Current Video Display */}
        <motion.div
          key={currentVideos[currentIndex].id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          onClick={() => onVideoClick(currentVideos[currentIndex])}
          className="cursor-pointer bg-gray-800/70 border border-gray-700 rounded-xl overflow-hidden hover:border-purple-500/40 transition-all duration-300 group"
        >
          <div className="relative aspect-video overflow-hidden">
            <img
              src={getThumbnailUrl(currentVideos[currentIndex].id)}
              onError={() => handleImageError(currentVideos[currentIndex].id)}
              alt={currentVideos[currentIndex].title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full w-12 h-12 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <FontAwesomeIcon icon={faPlay} className="text-white text-sm" />
              </div>
            </div>
            {/* Fallback if image fails to load */}
            {imageErrors[currentVideos[currentIndex].id] && (
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-pink-900 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faPlay}
                  className="text-white text-3xl"
                />
              </div>
            )}
          </div>

          <div className="p-4">
            <BoldText className="text-white line-clamp-2 text-base mb-2 leading-tight">
              {currentVideos[currentIndex].title}
            </BoldText>
            <RegularText className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
              {currentVideos[currentIndex].description}
            </RegularText>
            {currentVideos[currentIndex].category &&
              currentVideos[currentIndex].category !== 'interview' && (
                <div className="mt-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-purple-600/20 text-purple-300 text-xs font-medium border border-purple-500/30">
                    {currentVideos[currentIndex].category}
                  </span>
                </div>
              )}
          </div>
        </motion.div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center px-1">
          <button
            onClick={() => onNavigate(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-800/80 border border-gray-700 disabled:opacity-30 hover:bg-gray-700 transition-all text-sm text-white font-medium"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-3">
            <LightText className="text-sm text-gray-300">
              {currentIndex + 1} / {currentVideos.length}
            </LightText>
            <div className="flex gap-1">
              {currentVideos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => onNavigate(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentIndex === index
                      ? 'bg-purple-500 w-4'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate(currentIndex + 1)}
            disabled={currentIndex === currentVideos.length - 1}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-800/80 border border-gray-700 disabled:opacity-30 hover:bg-gray-700 transition-all text-sm text-white font-medium"
          >
            <span>Next</span>
            <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
          </button>
        </div>
      </div>
    );
  }
);

// Integrated Interview Component
const InterviewSection = memo(() => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [mobileVideoIndex, setMobileVideoIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>(
    {}
  );

  // Extract unique categories
  const categories = useMemo(
    () => ['all', ...new Set(videos.map(v => v.category || 'interview'))],
    []
  );

  // Filtered + Paginated Videos
  const filteredVideos = useMemo(() => {
    const filtered = videos.filter(v => {
      const matchesSearch =
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || v.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    return filtered.slice(0, visibleCount);
  }, [searchQuery, selectedCategory, visibleCount]);

  const mobileVideos = useMemo(() => {
    return filteredVideos.slice(0, 6);
  }, [filteredVideos]);

  const handleVideoClick = useCallback(
    (video: (typeof videos)[0]) => dispatch(setCurrentVideo(video)),
    [dispatch]
  );

  const handleMobileNavigate = useCallback((index: number) => {
    setMobileVideoIndex(index);
  }, []);

  const handleImageError = useCallback((videoId: string) => {
    setImageErrors(prev => ({ ...prev, [videoId]: true }));
  }, []);

  const getThumbnailUrl = useCallback(
    (videoId: string) => {
      // If image has errored, try fallback URLs
      if (imageErrors[videoId]) {
        return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
      }
      // Try multiple thumbnail qualities
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    },
    [imageErrors]
  );

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <section className="w-full py-6 md:py-8 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 rounded-lg md:rounded-xl overflow-hidden">
      {/* Interview Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-4 md:mb-6 px-4"
      >
        <AbrilFatFaceText className="text-xl md:text-2xl text-white mb-2">
          Ministry Interviews
        </AbrilFatFaceText>
        <RegularText className="text-gray-300 text-sm max-w-2xl mx-auto">
          Deep conversations and inspirational insights from Minister
          ClaudyGod's journey.
        </RegularText>
      </motion.div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-2 justify-center mb-4 px-4">
        <div className="relative w-full sm:w-56">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-2 top-2 text-gray-400 text-xs"
          />
          <input
            type="text"
            placeholder="Search interviews..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-7 pr-3 py-1.5 bg-gray-800/80 border border-gray-700 rounded-md focus:ring-1 focus:ring-purple-500 text-white text-sm"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(prev => !prev)}
            className="flex items-center gap-1 px-3 py-1.5 bg-gray-800/80 border border-gray-700 rounded-md hover:bg-gray-700 transition text-sm w-full sm:w-auto text-white"
          >
            <FontAwesomeIcon icon={faFilter} className="text-xs" /> Filter
          </button>
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full right-0 mt-1 bg-gray-800 border border-gray-700 rounded-md p-1 text-sm z-50 min-w-[100px]"
              >
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsFilterOpen(false);
                    }}
                    className={`block w-full text-left px-2 py-1 rounded-sm ${
                      selectedCategory === cat
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Video Navigation */}
      <div className="lg:hidden mb-4">
        <MobileInterviewNavigation
          currentVideos={mobileVideos}
          currentIndex={mobileVideoIndex}
          onNavigate={handleMobileNavigate}
          onVideoClick={handleVideoClick}
        />
      </div>

      {/* Desktop Video Grid */}
      <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-4">
        <AnimatePresence>
          {filteredVideos.map(video => (
            <motion.div
              key={video.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleVideoClick(video)}
              className="cursor-pointer bg-gray-800/70 border border-gray-700 rounded-xl overflow-hidden hover:border-purple-500/40 transition-all duration-300 hover:scale-[1.02] group"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={getThumbnailUrl(video.id)}
                  onError={() => handleImageError(video.id)}
                  alt={video.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full w-12 h-12 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <FontAwesomeIcon
                      icon={faPlay}
                      className="text-white text-sm"
                    />
                  </div>
                </div>
                {/* Fallback if image fails to load */}
                {imageErrors[video.id] && (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-pink-900 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faPlay}
                      className="text-white text-3xl"
                    />
                  </div>
                )}
              </div>

              <div className="p-4">
                <BoldText className="text-white line-clamp-2 text-base mb-2 leading-tight">
                  {video.title}
                </BoldText>
                <RegularText className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                  {video.description}
                </RegularText>
                {video.category && video.category !== 'interview' && (
                  <div className="mt-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-purple-600/20 text-purple-300 text-xs font-medium border border-purple-500/30">
                      {video.category}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Load More */}
      {visibleCount < videos.length && (
        <div className="text-center mt-6 md:mt-8 px-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleLoadMore}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-all duration-300 hover:shadow-lg"
          >
            Load More Interviews
          </motion.button>
        </div>
      )}
    </section>
  );
});

// Main Blog Component
export const Blog: React.FC = () => {
  const dispatch = useDispatch();
  const { currentArticle } = useSelector((state: RootState) => state.blog);
  const { colorScheme } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [mobilePostIndex, setMobilePostIndex] = useState(0);
  const [mediumScreenIndex, setMediumScreenIndex] = useState(0);
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);

  const POSTS_PER_PAGE = 9; // Increased for better grid layout
  const MOBILE_POSTS_PER_VIEW = 1;
  const MEDIUM_SCREEN_POSTS_PER_VIEW = 3;

  const currentPosts = useMemo(() => {
    const indexOfLastPost = currentPage * POSTS_PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
    return blogPosts.slice(indexOfFirstPost, indexOfLastPost);
  }, [currentPage]);

  const mobilePosts = useMemo(() => {
    return currentPosts.slice(0, MOBILE_POSTS_PER_VIEW * 3); // Show all for navigation
  }, [currentPosts]);

  const mediumScreenPosts = useMemo(() => {
    return currentPosts;
  }, [currentPosts]);

  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);

  const handleOpenCommunityModal = () => {
    setIsCommunityModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseCommunityModal = () => {
    setIsCommunityModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
    setMobilePostIndex(0);
    setMediumScreenIndex(0);
  }, []);

  const handleMobileNavigate = useCallback((index: number) => {
    setMobilePostIndex(index);
  }, []);

  const handleMediumScreenNavigate = useCallback((index: number) => {
    setMediumScreenIndex(index);
  }, []);

  const handleReadArticle = useCallback(
    (postId: string) => {
      const post = blogPosts.find(p => p.id === postId);
      if (post) {
        dispatch(
          openArticle({
            id: post.id,
            title: post.title,
            content: post.content,
            date: post.date,
            image: post.image,
          })
        );
      }
    },
    [dispatch]
  );

  const handleCloseArticle = useCallback(() => {
    dispatch(closeArticle());
  }, [dispatch]);

  return (
    <main className="relative w-full min-h-screen bg-white overflow-x-hidden">
      <SEO
        title="ClaudyGod Blog - Ministry Insights & Spiritual Teachings"
        description="Explore insightful blog posts, ministry updates, and spiritual teachings from ClaudyGod. Join our community of faith and growth."
        keywords="claudygod blog, ministry insights, spiritual teachings, christian blog, gospel articles"
        canonical="https://claudygod.org/blog"
        image="https://claudygod.org/images/blog-og.jpg"
      />

      {/* Modern Glass Morphism Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 backdrop-blur-3xl" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-purple-200/30 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-pink-200/30 blur-3xl animate-float delay-1000" />
      </div>

      {/* Article Detail Overlay */}
      {currentArticle && (
        <section className="fixed inset-0 z-50 overflow-y-auto bg-white/95 backdrop-blur-lg w-full">
          <Suspense fallback={<ArticleDetailSkeleton />}>
            <LazyArticleDetail
              post={currentArticle}
              onClose={handleCloseArticle}
            />
          </Suspense>
        </section>
      )}

      {/* Video Player Modal */}
      <Suspense fallback={<VideoPlayerSkeleton />}>
        <LazyVideoPlayerModal />
      </Suspense>

      {/* Community Modal - Full screen with backdrop blur */}
      {isCommunityModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative bg-white rounded-xl md:rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
            <button
              onClick={handleCloseCommunityModal}
              className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Modal
              isOpen={isCommunityModalOpen}
              onClose={handleCloseCommunityModal}
            />
          </div>
        </div>
      )}

      {/* Hero Section */}
      <LayoutTemplate
        backgroundImage={blog}
        overlayColor="rgba(0,0,0,0.55)"
        backgroundPosition="center center"
        className="h-[50vh] sm:h-[60vh] md:h-[70vh] min-h-[350px] w-full"
        title={''}
      >
        <motion.div
          className="relative z-20 flex flex-col items-center justify-center text-center w-full h-full px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mb-3 w-full"
          >
            <AbrilFatFaceText
              style={{
                color: '#ffffff',
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                lineHeight: '1.2',
                textShadow: '0 4px 12px rgba(0,0,0,0.8)',
                marginBottom: '0.5rem',
              }}
              useThemeColor={false}
            >
              Ministry Blog
            </AbrilFatFaceText>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-16 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 mb-3 mx-auto"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="w-full max-w-2xl mx-auto"
          >
            <RegularText
              style={{
                color: '#ffffff',
                fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                lineHeight: '1.4',
              }}
              useThemeColor={false}
            >
              Insights, teachings, and updates from ClaudyGod Ministries
            </RegularText>
          </motion.div>
        </motion.div>
      </LayoutTemplate>

      {/* Blog Content */}
      <div className="relative w-full max-w-7xl mx-auto">
        {/* Spacing after hero section */}
        <div className="h-8 md:h-12 lg:h-16 w-full" />

        {/* Blog Welcome Section - Full width and properly spaced */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full px-4 md:px-6 lg:px-8 mb-8 md:mb-12 lg:mb-16"
        >
          <div className="w-full bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500">
            <BlogWelcome onOpenModal={handleOpenCommunityModal} />
          </div>
        </motion.section>

        {/* Light HR Divider */}
        <hr className="w-full border-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8 md:my-12 lg:my-16" />

        {/* Professional Blog Posts Header */}
        <div className="w-full px-4 md:px-6 lg:px-8">
          <BlogPostsHeader />
        </div>

        {/* Blog Posts Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full py-6 md:py-8 lg:py-10"
        >
          {blogPosts.length === 0 ? (
            <div className="text-center py-8 md:py-12 lg:py-16 w-full px-4 md:px-6 lg:px-8">
              <BoldText className="text-lg md:text-xl lg:text-2xl mb-3 md:mb-4">
                No Blog Posts Available
              </BoldText>
              <RegularText className="text-gray-600 text-sm md:text-base">
                Check your blog data source or add some posts to see them here.
              </RegularText>
            </div>
          ) : (
            <>
              {/* Mobile Navigation (1 card) */}
              <MobilePostsNavigation
                currentPosts={mobilePosts}
                currentIndex={mobilePostIndex}
                onNavigate={handleMobileNavigate}
                onSelect={handleReadArticle}
              />

              {/* Medium Screen Navigation (3 cards) */}
              <MediumScreenPostsGrid
                currentPosts={mediumScreenPosts}
                currentIndex={mediumScreenIndex}
                onNavigate={handleMediumScreenNavigate}
                onSelect={handleReadArticle}
              />

              {/* Desktop Grid (Full grid) */}
              <DesktopPostsGrid
                currentPosts={currentPosts}
                onSelect={handleReadArticle}
              />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 md:gap-4 mt-8 md:mt-12 w-full px-4 md:px-6 lg:px-8">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all duration-300 font-medium text-sm shadow-sm"
                  >
                    <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                          currentPage === i + 1
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all duration-300 font-medium text-sm shadow-sm"
                  >
                    <span>Next</span>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="text-xs"
                    />
                  </button>
                </div>
              )}
            </>
          )}
        </motion.section>

        {/* Integrated Interview Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full py-8 md:py-10 lg:py-12 px-4 md:px-6 lg:px-8"
        >
          <InterviewSection />
        </motion.section>

        {/* Donation Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="w-full py-8 md:py-10 lg:py-12 px-4 md:px-6 lg:px-8"
        >
          <DonationCallToAction
            title="Partner with Our Ministry"
            subtitle="Your Support Makes a Difference"
            description="Join us in spreading the gospel through music. Your generous donations help fund worship events, album productions, and global outreach efforts. Every contribution directly impacts lives and advances God's kingdom."
            goFundMeUrl="https://www.gofundme.com/charity/claudygod-music-ministries/donate"
            donateUrl="/donate"
          />
        </motion.section>

        {/* Newsletter Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="w-full py-6 md:py-8 lg:py-10 px-4 md:px-6 lg:px-8"
        >
          <div className="w-full bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500">
            <NewsletterForm
              className="rounded-lg md:rounded-xl"
              title="Join Our Knowledge Community"
              description="Get exclusive insights and early access to our latest research and articles"
            />
          </div>
        </motion.section>
      </div>

      {/* Chatbot */}
      <motion.aside
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 z-50"
      >
        <Suspense fallback={<ChatbotSkeleton />}>
          <LazyChatbot className="transform transition-all hover:scale-110 hover:shadow-lg" />
        </Suspense>
      </motion.aside>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
};

export default memo(Blog);
