import React, { useState, useEffect, lazy, Suspense, useCallback, useMemo } from 'react';
import { Heroblog } from '../components/blogHero';
import { blogPosts } from '../components/blogsData';
import Pagination from '../components/pagination';
import Interview from '../components/Interview';

// Lazy load components
const LazyBlogWelcome = lazy(() => import('../components/blogWelcome'));
const LazyWelcomeImage = lazy(() => import('../components/WelcomeImage'));
const LazyBlogPost = lazy(() => import('../components/mainBlog'));
const LazyChatbot = lazy(() => import('../components/Chatbot'));
const LazyNewsletterForm = lazy(() => import('../components/Newsletter'));

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
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('blogReactions', JSON.stringify(reactions));
    localStorage.setItem('blogComments', JSON.stringify(comments));
  }, [reactions, comments]);

  // Handle page change
  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
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

  return (
    <div className="min-h-screen bg-gray-100">
      <Heroblog />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Column with Lazy Loading */}
          <Suspense fallback={<div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-80 animate-pulse" />}>
            <LazyWelcomeImage />
          </Suspense>
          
          {/* Welcome Text Column */}
          <Suspense fallback={<div className="h-80 flex items-center justify-center">Loading welcome message...</div>}>
            <LazyBlogWelcome />
          </Suspense>
        </div>
      </section>

<div className="relative py-8">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-gray-100 px-6 roboto-condensed text-4xl text-center text-purple-900 ">
            LATEST BLOG POSTS
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map(post => (
            <Suspense key={post.id} fallback={<div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 animate-pulse" />}>
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
              />
            </Suspense>
          ))}
        </div>
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      
      <Suspense fallback={<div className="max-w-7xl mx-auto px-4 h-96 bg-gray-200 animate-pulse" />}>
        <Interview />
      </Suspense>
      
      <Suspense fallback={<div>Loading chatbot...</div>}>
        <LazyChatbot />
      </Suspense>
      
      <Suspense fallback={<div className="max-w-7xl mx-auto px-4 h-60 bg-gray-200 animate-pulse" />}>
        <LazyNewsletterForm />
      </Suspense>
    </div>
  );
};