import React, { useState, useEffect, lazy, Suspense, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Heroblog } from '../components/blog/blogHero';
import { blogPosts } from '../components/blog/blogsData';
import Pagination from '../components/util/pagination';
import Interview from '../components/blog/Interview';
import { NewsletterForm } from '../components/util/Newsletter';
import { DonationCallToAction } from '../components/util/DonationSupport';
import { openArticle, closeArticle } from '../store/blogs';
import { RootState } from '../store/store';
import { ExtraBoldText, RegularText} from '../components/ui/fonts/typography';
import { useTheme } from '../contexts/ThemeContext';

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
  const [reactions, setReactions] = useState<{ [postId: string]: Reactions }>({});
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
        [emoji]: (prev[postId]?.[emoji] || 0) + 1
      }
    }));
  }, []);
  
  const handleAddComment = useCallback((postId: string, commentText: string) => {
    setComments(prev => ({
      ...prev,
      [postId]: [
        ...(prev[postId] || []),
        { 
          id: Date.now().toString(), 
          text: commentText, 
          date: new Date().toISOString() 
        }
      ]
    }));
  }, []);
  
  const handleShare = useCallback(async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Check out this blog post!',
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing content:', error);
    }
  }, []);
  
  const handleReadArticle = useCallback((postId: string) => {
    const post = blogPosts.find(p => p.id === postId);
    if (post) {
      dispatch(openArticle({
        id: post.id,
        title: post.title,
        content: post.content,
        date: post.date,
        image: post.image
      }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [dispatch]);
  
  const handleCloseArticle = useCallback(() => {
    dispatch(closeArticle());
  }, [dispatch]);
  
  // Enhanced animation classes
  const fadeInClass = "transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]";
  const fadeInUpClass = `${fadeInClass} translate-y-10 opacity-0 ${isMounted ? '!translate-y-0 !opacity-100' : ''}`;
  const staggerClass = (index: number) => 
    `${fadeInClass} translate-y-8 opacity-0 ${isMounted ? `!translate-y-0 !opacity-100 delay-[${index * 75}ms]` : ''}`;

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Modern Glass Morphism Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-gray-100/20 backdrop-blur-3xl" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            radial-gradient(circle at 15% 50%, rgba(210, 180, 140, 0.3) 0%, transparent 25%),
            radial-gradient(circle at 85% 30%, rgba(210, 180, 140, 0.25) 0%, transparent 25%),
            radial-gradient(circle at 50% 80%, rgba(210, 180, 140, 0.2) 0%, transparent 25%)
          `,
          backgroundSize: '200% 200%',
          animation: 'sandyMove 20s infinite alternate',
        }} />
        
        {/* Modern floating blobs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-gradient-to-r from-amber-100/30 to-orange-200/20 blur-3xl animate-float1" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-gradient-to-r from-sky-100/20 to-blue-200/20 blur-3xl animate-float2" />
      </div>
      
      {/* Main Content */}
      <div className="relative">
        {/* Article Detail Overlay - now full viewport */}
        {currentArticle && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-white/95 backdrop-blur-lg">
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <RegularText>Loading article...</RegularText>
              </div>
            }>
              <LazyArticleDetail 
                post={currentArticle} 
                onClose={handleCloseArticle} 
              />
            </Suspense>
          </div>
        )}

        <Heroblog className={`${fadeInClass} ${isMounted ? 'opacity-100' : 'opacity-0'}`} />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <Suspense fallback={
              <div className="border-2 border-dashed rounded-2xl w-full h-80 md:h-96 animate-pulse bg-white/50" />
            }>
              <div className={`${fadeInUpClass} transition-delay-100 rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-700 bg-white/80 backdrop-blur-lg border border-white/20`}>
                <LazyWelcomeImage />
              </div>
            </Suspense>
            <Suspense fallback={
              <div className="h-80 flex items-center justify-center bg-white/50 rounded-xl">
                <RegularText>Loading welcome message...</RegularText>
              </div>
            }>
              <div className={`${fadeInUpClass} bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-700`}>
                <LazyBlogWelcome />
              </div>
            </Suspense>
          </div>
        </section>

        <div className="relative py-12">
          <div className="relative flex justify-center">
            <ExtraBoldText 
              className={`px-6 ${fadeInUpClass}`}
              fontSize="2rem"
              style={{ 
                backgroundImage: `linear-gradient(to right, ${colorScheme.primary}, ${colorScheme.secondary})`,
                color: 'transparent',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                textShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}
            >
              LATEST BLOG POSTS
            </ExtraBoldText>
          </div>
          <div className="absolute inset-x-0 -bottom-4 flex justify-center">
            <div className={`h-[2px] w-32 bg-gradient-to-r from-transparent via-${colorScheme.primary} to-transparent ${fadeInClass} ${isMounted ? 'opacity-100 delay-300' : 'opacity-0'}`} />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post, index) => (
              <div 
                key={post.id} 
                className={`${staggerClass(index)} h-full transform transition-all duration-700 hover:-translate-y-3 will-change-transform`}
              >
                <Suspense fallback={
                  <div className="rounded-3xl w-full h-96 animate-pulse bg-white/50" />
                }>
                  <div className="bg-white/80 backdrop-blur-lg rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 h-full flex flex-col border border-white/20 group">
                    <LazyBlogPost
                      id={post.id}
                      title={post.title}
                      content={post.content}
                      date={post.date}
                      image={post.image}
                      reactions={reactions[post.id] || {}}
                      comments={comments[post.id] || []}
                      onAddReaction={handleAddReaction}
                      onAddComment={handleAddComment}
                      onShare={handleShare}
                      onReadArticle={handleReadArticle}
                    />
                  </div>
                </Suspense>
              </div>
            ))}
          </div>
          
          <div className={`mt-16 ${fadeInClass} ${isMounted ? 'opacity-100 delay-500' : 'opacity-0'}`}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className="justify-center"
            />
          </div>
        </div>
        
        <div className={`max-w-7xl mx-auto px-4 py-16 ${fadeInClass} ${isMounted ? 'opacity-100 delay-300' : 'opacity-0'}`}>
          <Suspense fallback={
            <div className="h-96 rounded-3xl animate-pulse bg-white/50" />
          }>
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500">
              <Interview />
            </div>
          </Suspense>
        </div>
        
        <DonationCallToAction
          title="Partner with Our Ministry"
          subtitle="Your Support Makes a Difference"
          description="Join us in spreading the gospel through music. Your generous donations help fund worship events, album productions, and global outreach efforts. Every contribution directly impacts lives and advances God's kingdom."
          goFundMeUrl="https://www.gofundme.com/charity/claudygod-music-ministries/donate"
          donateUrl="/donate"
          className={`${fadeInClass} ${isMounted ? 'opacity-100 delay-400' : 'opacity-0'}`}
        />
        
        <div className={`fixed bottom-8 right-8 z-50 ${fadeInClass} ${isMounted ? 'opacity-100 delay-700' : 'opacity-0'}`}>
          <Suspense fallback={
            <div className="w-16 h-16 rounded-full animate-pulse bg-white/70" />
          }>
            <LazyChatbot className="transform transition-all hover:scale-105 hover:shadow-lg" />
          </Suspense>
        </div>
        
        <div className={`max-w-4xl mx-auto px-4 py-16 ${fadeInClass} ${isMounted ? 'opacity-100 delay-500' : 'opacity-0'}`}>
          <Suspense fallback={
            <div className="h-60 rounded-3xl animate-pulse bg-white/50" />
          }>
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500">
              <NewsletterForm 
                className="rounded-2xl"
                title="Join Our Knowledge Community"
                description="Get exclusive insights and early access to our latest research and articles"
              />
            </div>
          </Suspense>
        </div>
      </div>

      {/* Modern animations */}
      <style jsx global>{`
        @keyframes sandyMove {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 100%; }
        }
        
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, -30px) rotate(5deg); }
        }
        
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-20px, 30px) rotate(-5deg); }
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
          background: rgba(0,0,0,0.05);
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.2);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
};