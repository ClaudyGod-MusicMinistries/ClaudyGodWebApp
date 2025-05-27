import { useState, useEffect } from 'react';
import { Herosection } from '../components/Herosection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faShare,
  faFaceSmile,
  faArrowLeft,
  faArrowRight,
  faComments,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import { blogPosts } from '../components/blogsData';

interface Comment {
  id: string;
  text: string;
  date: string;
}

interface Reactions {
  [key: string]: number;
}

const POSTS_PER_PAGE = 3;

export const Blogs: React.FC = () => {
  const [currentGroup, setCurrentGroup] = useState(0);
  const [reactions, setReactions] = useState<{ [postId: string]: Reactions }>({});
  const [comments, setComments] = useState<{ [postId: string]: Comment[] }>({});
  const [newComment, setNewComment] = useState('');
  const [showCommentSection, setShowCommentSection] = useState<string | null>(null);
  const [showReactions, setShowReactions] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const totalGroups = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  const currentPosts = blogPosts.slice(
    currentGroup * POSTS_PER_PAGE,
    (currentGroup + 1) * POSTS_PER_PAGE
  );

  useEffect(() => {
    const savedReactions = localStorage.getItem('blogReactions');
    const savedComments = localStorage.getItem('blogComments');
    
    if (savedReactions) setReactions(JSON.parse(savedReactions));
    if (savedComments) setComments(JSON.parse(savedComments));
  }, []);

  useEffect(() => {
    localStorage.setItem('blogReactions', JSON.stringify(reactions));
    localStorage.setItem('blogComments', JSON.stringify(comments));
  }, [reactions, comments]);

  const handleNext = () => {
    if (currentGroup < totalGroups - 1) setCurrentGroup(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentGroup > 0) setCurrentGroup(prev => prev - 1);
  };

  const handleAddReaction = (postId: string, emoji: string) => {
    setReactions(prev => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        [emoji]: (prev[postId]?.[emoji] || 0) + 1
      }
    }));
    setShowReactions(null);
  };

  const handleCommentSubmit = (postId: string) => {
    if (newComment.trim()) {
      setComments(prev => ({
        ...prev,
        [postId]: [
          ...(prev[postId] || []),
          {
            id: Date.now().toString(),
            text: newComment,
            date: new Date().toISOString()
          }
        ]
      }));
      setNewComment('');
    }
  };

  const handleShare = async (postId: string) => {
    const post = blogPosts.find(p => p.id === postId);
    if (!post) return;

    try {
      await navigator.share({
        title: post.title,
        text: post.content,
        url: window.location.href
      });
    } catch (err) {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleReadMore = (postId: string) => setSelectedPostId(postId);
  const handleCloseFullContent = () => setSelectedPostId(null);

  return (
    <div className="w-full bg-gray-100">
      {/* Full Content Modal */}
      {selectedPostId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleCloseFullContent}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FontAwesomeIcon icon={faXmark} size="lg" />
            </button>
            
            {blogPosts.map(post => post.id === selectedPostId && (
              <div key={post.id} className="space-y-4">
                <h2 className="text-3xl font-roboto-condensed font-bold text-purple-900">
                  {post.title}
                </h2>
                <div className="text-sm text-gray-500">
                  Posted on: {post.date}
                </div>
                <p className="text-gray-700 whitespace-pre-line text-base leading-relaxed">
                  {post.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
 <Herosection />
      {/* Hero Section */}
      {/* <div className="w-full bg-purple-900 py-16 px-4">
       
        <h1 className="text-4xl md:text-6xl text-white text-center font-roboto-condensed">
          ClaudyGod Music & Ministries
        </h1>
      </div> */}

      {/* Welcome Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-work-sans font-bold text-purple-900 mb-4">
            Welcome to Our Community
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            We are a faith-based community dedicated to spiritual growth and meaningful connections.
            Our mission is to provide a platform for sharing insights, fostering discussions, and
            building relationships centered around faith and worship.
          </p>
        </div>
      </div>

      {/* Blog Posts Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
          {currentPosts.map(post => {
            const postReactions = reactions[post.id] || {};
            const postComments = comments[post.id] || [];

            return (
              <div key={post.id} className="bg-white rounded-xl shadow-lg p-4 w-[300px] h-[300px] 
                flex flex-col overflow-hidden">
                {/* Image Container */}
                <div className="h-32 w-full overflow-hidden rounded-xl mb-3">
                  <img
                    src={post.image}
                    alt="Blog visual"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content Container */}
                <div className="flex-1 flex flex-col">
                  <h2 className="text-xl font-roboto-condensed font-bold text-purple-900 mb-2 truncate">
                    {post.title}
                  </h2>
                  
                  <div className="flex-1 overflow-y-auto mb-2">
                    <p className="text-gray-700 text-sm line-clamp-4">
                      {post.content}
                    </p>
                  </div>

                  {/* Read More Button */}
                  <button
                    onClick={() => handleReadMore(post.id)}
                    className="text-purple-600 hover:text-purple-700 text-sm font-work-sans mb-2"
                  >
                    Read More →
                  </button>

                  {/* Post Footer */}
                  <div className="mt-auto">
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Posted: {post.date}</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowReactions(showReactions === post.id ? null : post.id);
                          }}
                          className="text-purple-600 hover:text-purple-700"
                        >
                          <FontAwesomeIcon icon={faFaceSmile} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowCommentSection(showCommentSection === post.id ? null : post.id);
                          }}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <FontAwesomeIcon icon={faComment} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShare(post.id);
                          }}
                          className="text-green-600 hover:text-green-700"
                        >
                          <FontAwesomeIcon icon={faShare} />
                        </button>
                      </div>
                    </div>

                    {/* Reactions Popup */}
                    {showReactions === post.id && (
                      <div className="absolute bg-white border rounded-lg shadow-lg p-2 z-10 mt-1">
                        <div className="grid grid-cols-5 gap-1">
                          {['🙌', '🔥', '❤️', '😢', '🎉'].map(emoji => (
                            <button
                              key={emoji}
                              onClick={() => handleAddReaction(post.id, emoji)}
                              className="p-1 hover:bg-gray-100 rounded transition-all"
                            >
                              <span className="text-xl">{emoji}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Comments Popup */}
                {showCommentSection === post.id && (
                  <div className="absolute bg-white p-3 rounded-lg shadow-lg w-[280px] h-[200px] z-10 
                    flex flex-col">
                    <div className="flex-1 overflow-y-auto">
                      {postComments.map(comment => (
                        <div key={comment.id} className="p-2 bg-gray-50 rounded mb-2">
                          <p className="text-gray-700 text-sm">{comment.text}</p>
                          <span className="text-xs text-gray-500">
                            {new Date(comment.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2">
                      <div className="flex gap-2">
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Add comment..."
                          className="flex-1 p-1 border rounded text-sm"
                          rows={1}
                        />
                        <button
                          onClick={() => handleCommentSubmit(post.id)}
                          className="self-start px-2 py-1 bg-purple-600 text-white rounded 
                            hover:bg-purple-700 text-sm"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            disabled={currentGroup === 0}
            className="p-2 bg-white rounded-full shadow hover:bg-purple-100 transition 
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-purple-800" />
          </button>
          <span className="text-gray-600 font-work-sans">
            Page {currentGroup + 1} of {totalGroups}
          </span>
          <button
            onClick={handleNext}
            disabled={currentGroup === totalGroups - 1}
            className="p-2 bg-white rounded-full shadow hover:bg-purple-100 transition 
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FontAwesomeIcon icon={faArrowRight} className="text-purple-800" />
          </button>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setShowChat(!showChat)}
          className="p-4 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 
            transition-colors"
        >
          <FontAwesomeIcon icon={faComments} size="lg" />
        </button>
        
        {showChat && (
          <div className="absolute bottom-20 right-0 w-72 bg-white rounded-lg shadow-xl">
            <div className="p-4 border-b">
              <h3 className="font-work-sans font-semibold">Community Support</h3>
            </div>
            <div className="h-48 p-4 overflow-y-auto">
              <p className="text-sm text-gray-600">How can we assist you today?</p>
            </div>
            <div className="p-4 border-t">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full p-2 border rounded text-sm"
              />
            </div>
          </div>
        )}
      </div>
       </div>
  );
};