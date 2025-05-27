import React, { useState, useEffect } from 'react';
import { BlogPost } from '../components/mainBlog';
import { Heroblog } from '../components/blogHero';
import { blogPosts } from '../components/blogsData';
import Pagination from '../components/pagination';
import { Chatbot } from '../components/Chatbot';

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

  const POSTS_PER_PAGE = 6; // 2x3 grid layout
  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  
  // Get current posts for the page
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
    const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

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
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle adding a reaction to a post
  const handleAddReaction = (postId: string, emoji: string) => {
    setReactions(prev => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        [emoji]: (prev[postId]?.[emoji] || 0) + 1
      }
    }));
  };

  // Handle adding a comment to a post
  const handleAddComment = (postId: string, commentText: string) => {
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
  };

  // Handle share functionality
  const handleShare = async () => {
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
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Heroblog />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map(post => (
            <BlogPost
              key={post.id}
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
          ))}
        </div>
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      
      <Chatbot />
    </div>
  );
};