import React, {
  useState,
  useEffect,
  lazy,
  Suspense,
  useCallback,
  useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookOpen,
  faNewspaper,
  faQuoteRight,
} from '@fortawesome/free-solid-svg-icons';

import { Heroblog } from '../components/blog/blogHero';
import { blogPosts } from '../components/blog/blogsData';
import Interview from '../components/blog/Interview';
import { NewsletterForm } from '../components/util/Newsletter';
import { DonationCallToAction } from '../components/util/DonationSupport';
import { openArticle, closeArticle } from '../store/blogs';
import { RootState } from '../store/store';
import {
  ExtraBoldText,
  RegularText,
  SemiBoldText,
  LightText,
} from '../components/ui/fonts/typography';
import { LayoutTemplate } from '../components/util/hero';
import { SEO } from '../components/util/SEO';
import { blog } from '../assets';

const LazyBlogWelcome = lazy(() => import('../components/blog/blogWelcome'));
const LazyWelcomeImage = lazy(() => import('../components/util/WelcomeImage'));
const LazyBlogPost = lazy(() => import('../components/blog/blogPost'));
const LazyChatbot = lazy(() => import('../components/Chatbot'));
const LazyArticleDetail = lazy(() => import('../components/blog/Article'));

interface Comment {
  id: string;
  text: string;
  date: string;
}

interface Reactions {
  [key: string]: number;
}

export const Blog: React.FC = () => {
  const dispatch = useDispatch();
  const { currentArticle } = useSelector((state: RootState) => state.blog);
  const { colorScheme } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [reactions, setReactions] = useState<{ [postId: string]: Reactions }>(
    {}
  );
  const [comments, setComments] = useState<{ [postId: string]: Comment[] }>({});
  const [isMounted, setIsMounted] = useState(false);

  const POSTS_PER_PAGE = 6;
  const currentPosts = useMemo(() => {
    const indexOfLastPost = currentPage * POSTS_PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
    return blogPosts.slice(indexOfFirstPost, indexOfLastPost);
  }, [currentPage]);

  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);

  useEffect(() => {
    const savedReactions = localStorage.getItem('blogReactions');
    const savedComments = localStorage.getItem('blogComments');

    if (savedReactions) setReactions(JSON.parse(savedReactions));
    if (savedComments) setComments(JSON.parse(savedComments));
    setIsMounted(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('blogReactions', JSON.stringify(reactions));
    localStorage.setItem('blogComments', JSON.stringify(comments));
  }, [reactions, comments]);

  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 600, behavior: 'smooth' });
  }, []);

  const handleAddReaction = useCallback((postId: string, emoji: string) => {
    setReactions(prev => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        [emoji]: (prev[postId]?.[emoji] || 0) + 1,
      },
    }));
  }, []);

  const handleAddComment = useCallback(
    (postId: string, commentText: string) => {
      setComments(prev => ({
        ...prev,
        [postId]: [
          ...(prev[postId] || []),
          {
            id: Date.now().toString(),
            text: commentText,
            date: new Date().toISOString(),
          },
        ],
      }));
    },
    []
  );

  const handleShare = useCallback(async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Check out this blog post!',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing content:', error);
    }
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [dispatch]
  );

  const handleCloseArticle = useCallback(() => {
    dispatch(closeArticle());
  }, [dispatch]);

  return (
    <main
      className="relative overflow-hidden"
      style={{
        backgroundColor: colorScheme.text,
      }}
    >
      <SEO
        title="ClaudyGod Blog - Ministry Insights & Spiritual Teachings"
        description="Explore insightful blog posts, ministry updates, and spiritual teachings from ClaudyGod. Join our community of faith and growth."
        keywords="claudygod blog, ministry insights, spiritual teachings, christian blog, gospel articles"
        canonical="https://claudygod.org/blog"
        image="https://claudygod.org/images/blog-og.jpg"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'ClaudyGod Ministry Blog',
          description: 'Spiritual insights and ministry updates',
          url: 'https://claudygod.org/blog',
          publisher: {
            '@type': 'Person',
            name: 'ClaudyGod',
          },
        }}
      />

      {/* Modern Glass Morphism Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-gray-100/20 backdrop-blur-3xl" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
            radial-gradient(circle at 15% 50%, rgba(210, 180, 140, 0.3) 0%, transparent 25%),
            radial-gradient(circle at 85% 30%, rgba(210, 180, 140, 0.25) 0%, transparent 25%),
            radial-gradient(circle at 50% 80%, rgba(210, 180, 140, 0.2) 0%, transparent 25%)
          `,
            backgroundSize: '200% 200%',
            animation: 'sandyMove 20s infinite alternate',
          }}
        />

        {/* Modern floating blobs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-gradient-to-r from-amber-100/30 to-orange-200/20 blur-3xl animate-float1" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-gradient-to-r from-sky-100/20 to-blue-200/20 blur-3xl animate-float2" />
      </div>

      {/* Article Detail Overlay */}
      {currentArticle && (
        <section className="fixed inset-0 z-50 overflow-y-auto bg-white/95 backdrop-blur-lg">
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <RegularText>Loading article...</RegularText>
              </div>
            }
          >
            <LazyArticleDetail
              post={currentArticle}
              onClose={handleCloseArticle}
            />
          </Suspense>
        </section>
      )}

      {/* Hero Section */}
      <LayoutTemplate
        backgroundImage={blog}
        overlayColor="rgba(0,0,0,0.55)"
        backgroundPosition="center center"
        className="h-[70vh] sm:h-[80vh] md:h-[90vh] lg:h-[100vh] min-h-[500px]"
        title={''}
      >
        <motion.div
          className="relative z-20 flex flex-col items-center justify-center text-center w-full h-full px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mb-4 sm:mb-6 md:mb-8"
          >
            <ExtraBoldText
              style={{
                color: '#ffffff',
                fontSize: 'clamp(2rem, 8vw, 4.5rem)',
                lineHeight: '1.1',
                textShadow: '0 4px 12px rgba(0,0,0,0.8)',
                marginBottom: '0.5rem',
              }}
              useThemeColor={false}
            >
              Ministry Blog
            </ExtraBoldText>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mb-4 sm:mb-6 md:mb-8 mx-auto"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <SemiBoldText
              style={{
                color: '#ffffff',
                fontSize: 'clamp(1.125rem, 4vw, 1.75rem)',
                textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                lineHeight: '1.4',
              }}
              useThemeColor={false}
            >
              Insights, teachings, and updates from ClaudyGod Ministries
            </SemiBoldText>
          </motion.div>
        </motion.div>
      </LayoutTemplate>

      {/* Blog Content */}
      <article className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        {/* Section Header */}
        <header className="mb-8 sm:mb-12 md:mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 rounded-full bg-opacity-10 mb-4 sm:mb-6"
            style={{ backgroundColor: `${colorScheme.primary}20` }}
          >
            <FontAwesomeIcon
              icon={faBookOpen}
              style={{ color: colorScheme.primary }}
              className="text-sm sm:text-base"
            />
            <LightText
              style={{
                color: colorScheme.primary,
                fontSize: 'clamp(0.75rem, 3vw, 0.875rem)',
                letterSpacing: '0.05em',
              }}
              useThemeColor={false}
            >
              MINISTRY INSIGHTS
            </LightText>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ExtraBoldText
              style={{
                color: colorScheme.primary,
                fontSize: 'clamp(1.75rem, 6vw, 3rem)',
                lineHeight: '1.1',
                marginBottom: '0.75rem',
              }}
              useThemeColor={false}
            >
              Spiritual Insights & Ministry Updates
            </ExtraBoldText>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <SemiBoldText
              style={{
                color: colorScheme.accent,
                fontSize: 'clamp(1rem, 3vw, 1.375rem)',
                lineHeight: '1.5',
              }}
              useThemeColor={false}
            >
              Explore our collection of blog posts, interviews, and spiritual
              teachings that inspire faith and growth in your journey with
              Christ.
            </SemiBoldText>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-16 sm:w-20 md:w-24 h-1 mx-auto mt-4 sm:mt-6 rounded-full"
            style={{ backgroundColor: colorScheme.accent }}
          />
        </header>

        {/* Welcome Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <Suspense
              fallback={
                <div className="border-2 border-dashed rounded-2xl w-full h-80 md:h-96 animate-pulse bg-white/50" />
              }
            >
              <motion.figure
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-700 bg-white/80 backdrop-blur-lg border border-white/20"
              >
                <LazyWelcomeImage />
              </motion.figure>
            </Suspense>

            <Suspense
              fallback={
                <div className="h-80 flex items-center justify-center bg-white/50 rounded-xl">
                  <RegularText>Loading welcome message...</RegularText>
                </div>
              }
            >
              <motion.article
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/80 backdrop-blur-lg p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-700"
              >
                <LazyBlogWelcome />
              </motion.article>
            </Suspense>
          </div>
        </motion.section>

        {/* Quote Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <blockquote
            className="relative p-6 sm:p-8 rounded-2xl text-center"
            style={{
              background: `linear-gradient(135deg, ${colorScheme.gray[900]}, ${colorScheme.gray[800]})`,
              border: `1px solid ${colorScheme.gray[700]}`,
            }}
          >
            <div className="max-w-4xl mx-auto">
              <div
                className="absolute top-4 right-4 text-3xl sm:text-4xl opacity-20"
                style={{ color: colorScheme.accent }}
              >
                <FontAwesomeIcon icon={faQuoteRight} />
              </div>
              <div className="flex items-center justify-center mb-4">
                <FontAwesomeIcon
                  icon={faNewspaper}
                  className="mr-3 text-lg"
                  style={{ color: colorScheme.accent }}
                />
                <LightText
                  style={{
                    color: 'white',
                    fontSize: 'clamp(1.025rem, 2vw, 1.375rem)',
                    lineHeight: '1.6',
                    fontStyle: 'italic',
                  }}
                  useThemeColor={false}
                >
                  "Through these writings, may your faith be strengthened and
                  your understanding of God's word deepened."
                </LightText>
              </div>
              <SemiBoldText
                style={{
                  textAlign: 'right',
                  marginTop: '1rem',
                  color: colorScheme.primary,
                  fontSize: '1rem',
                }}
                useThemeColor={false}
              >
                - Minister ClaudyGod
              </SemiBoldText>
            </div>
          </blockquote>
        </motion.section>

        {/* Interview Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <Suspense
            fallback={
              <div className="h-96 rounded-3xl animate-pulse bg-white/50" />
            }
          >
            <article className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500">
              <Interview />
            </article>
          </Suspense>
        </motion.section>

        {/* Donation Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12 sm:mb-16 md:mb-20"
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
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            borderRadius: colorScheme.borderRadius.xlarge,
            background: `linear-gradient(135deg, ${colorScheme.gray[50]}, ${colorScheme.gray[100]})`,
          }}
          className="p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl shadow-sm max-w-4xl mx-auto"
        >
          <Suspense
            fallback={
              <div className="h-60 rounded-3xl animate-pulse bg-white/50" />
            }
          >
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500">
              <NewsletterForm
                className="rounded-2xl"
                title="Join Our Knowledge Community"
                description="Get exclusive insights and early access to our latest research and articles"
              />
            </div>
          </Suspense>
        </motion.section>
      </article>

      {/* Chatbot */}
      <motion.aside
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Suspense
          fallback={
            <div className="w-16 h-16 rounded-full animate-pulse bg-white/70" />
          }
        >
          <LazyChatbot className="transform transition-all hover:scale-105 hover:shadow-lg" />
        </Suspense>
      </motion.aside>

      <style>{`
        @keyframes sandyMove {
          0% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 100%;
          }
        }

        @keyframes float1 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(20px, -30px) rotate(5deg);
          }
        }

        @keyframes float2 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(-20px, 30px) rotate(-5deg);
          }
        }

        .animate-float1 {
          animation: float1 12s ease-in-out infinite;
        }

        .animate-float2 {
          animation: float2 15s ease-in-out infinite;
        }

        /* Modern scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </main>
  );
};
