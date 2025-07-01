import React, { useState, useEffect, lazy, Suspense, useCallback, useMemo } from 'react';
import { Heroblog } from '../components/blog/blogHero';
import { blogPosts } from '../components/blog/blogsData';
import Pagination from '../components/util/pagination';
import Interview from '../components/Interview';
import { NewsletterForm } from '../components/util/Newsletter';
// Lazy load components
const LazyBlogWelcome = lazy(() => import('../components/blog/blogWelcome'));
const LazyWelcomeImage = lazy(() => import('../components/util/WelcomeImage'));
const LazyBlogPost = lazy(() => import('../components/mainBlog'));
const LazyChatbot = lazy(() => import('../components/Chatbot'));


interface Comment {
  id: string;
  text: string;
  date: string;
}

interface Reactions {
  [key: string]: number;
}

export const Blog: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [reactions, setReactions] = useState<{ [postId: string]: Reactions }>({});
  const [comments, setComments] = useState<{ [postId: string]: Comment[] }>({});
  const [isMounted, setIsMounted] = useState(false);

  const POSTS_PER_PAGE = 6;
  
  // Calculate current posts and total pages
  const currentPosts = useMemo(() => {
    const indexOfLastPost = currentPage * POSTS_PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
    return blogPosts.slice(indexOfFirstPost, indexOfLastPost);
  }, [currentPage]);

  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);

  // Load saved data from localStorage
  useEffect(() => {
    const savedReactions = localStorage.getItem('blogReactions');
    const savedComments = localStorage.getItem('blogComments');
    
    if (savedReactions) setReactions(JSON.parse(savedReactions));
    if (savedComments) setComments(JSON.parse(savedComments));
    setIsMounted(true);
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('blogReactions', JSON.stringify(reactions));
    localStorage.setItem('blogComments', JSON.stringify(comments));
  }, [reactions, comments]);

  // Handle page change
  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 600, behavior: 'smooth' });
  }, []);

  // Handle adding a reaction to a post
  const handleAddReaction = useCallback((postId: string, emoji: string) => {
    setReactions(prev => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        [emoji]: (prev[postId]?.[emoji] || 0) + 1
      }
    }));
  }, []);

  // Handle adding a comment to a post
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

  // Handle share functionality
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

  // Animation classes based on mount state
  const fadeInClass = "transition-all duration-700 ease-out";
  const fadeInUpClass = `${fadeInClass} translate-y-8 opacity-0 ${isMounted ? '!translate-y-0 !opacity-100' : ''}`;
  const staggerClass = (index: number) => 
    `${fadeInClass} translate-y-8 opacity-0 ${isMounted ? `!translate-y-0 !opacity-100 delay-[${index * 75}ms]` : ''}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Heroblog className={`${fadeInClass} ${isMounted ? 'opacity-100' : 'opacity-0'}`} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Suspense fallback={<div className="bg-gray-200 border-2 border-dashed rounded-2xl w-full h-80 md:h-96 animate-pulse" />}>
            <div className={`${fadeInUpClass} transition-delay-100 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500`}>
              <LazyWelcomeImage />
            </div>
          </Suspense>
          <Suspense fallback={<div className="h-80 flex items-center justify-center">Loading welcome message...</div>}>
            <div className={`${fadeInUpClass} transition-delay-200`}>
              <LazyBlogWelcome />
            </div>
          </Suspense>
        </div>
      </section>

      <div className="relative py-8">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className={`bg-gradient-to-r from-indigo-600 to-purple-700 text-transparent bg-clip-text px-6 roboto-condensed text-4xl md:text-5xl font-bold text-center ${fadeInUpClass}`}>
            LATEST BLOG POSTS
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post, index) => (
            <div 
              key={post.id} 
              className={`${staggerClass(index)} h-full transform transition-all duration-500 hover:-translate-y-2`}
            >
              <Suspense fallback={
                <div className="bg-gray-100 border-2 border-gray-200 rounded-2xl w-full h-96 animate-pulse overflow-hidden" />
              }>
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
                  className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300 h-full flex flex-col"
                />
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
        <Suspense fallback={<div className="h-96 bg-gradient-to-r from-gray-100 to-gray-50 rounded-3xl animate-pulse" />}>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 shadow-lg">
            <Interview />
          </div>
        </Suspense>
      </div>
      
      <div className={`fixed bottom-8 right-8 z-50 ${fadeInClass} ${isMounted ? 'opacity-100 delay-700' : 'opacity-0'}`}>
        <Suspense fallback={<div className="w-16 h-16 rounded-full bg-indigo-600 animate-pulse" />}>
          <LazyChatbot className="transform transition-all hover:scale-105" />
        </Suspense>
      </div>
      
      <div className={`max-w-4xl mx-auto px-4 py-16 ${fadeInClass} ${isMounted ? 'opacity-100 delay-500' : 'opacity-0'}`}>
        <Suspense fallback={<div className="h-60 bg-gradient-to-r from-gray-100 to-gray-50 rounded-3xl animate-pulse" />}>
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-8 border border-gray-100">
            <NewsletterForm 
              className="rounded-2xl"
              title="Join Our Knowledge Community"
              description="Get exclusive insights and early access to our latest research and articles"
            />
          </div>
        </Suspense>
      </div>
    </div>
  );
};