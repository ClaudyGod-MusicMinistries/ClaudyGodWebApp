import { useState, useEffect } from 'react';
import { Herosection } from '../components/Herosection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faShare,
  faFaceSmile,
  faArrowLeft,
  faArrowRight,
  faComments
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

const POSTS_PER_PAGE = 6;

export const Blogs: React.FC = () => {
  const [currentGroup, setCurrentGroup] = useState(0);
  const [reactions, setReactions] = useState<{ [postId: string]: Reactions }>({});
  const [comments, setComments] = useState<{ [postId: string]: Comment[] }>({});
  const [newComment, setNewComment] = useState('');
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [showReactionsId, setShowReactionsId] = useState<string | null>(null);
  const [showCommentInput, setShowCommentInput] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<string[]>([]);

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
    if (currentGroup < totalGroups - 1) {
      setCurrentGroup(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentGroup > 0) {
      setCurrentGroup(prev => prev - 1);
    }
  };

  const handleAddReaction = (postId: string, emoji: string) => {
    setReactions(prev => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        [emoji]: (prev[postId]?.[emoji] || 0) + 1
      }
    }));
    setShowReactionsId(null);
  };

  const handleCommentSubmit = (postId: string) => {
    if (newComment.trim()) {
      setComments(prev => ({
        ...prev,
        [postId]: [
          ...(prev[postId] || []),
          { id: Date.now().toString(), text: newComment, date: new Date().toISOString() }
        ]
      }));
      setNewComment('');
      setShowCommentInput(null);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({ title: 'Check out this blog post!', url: window.location.href });
    } catch {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleChatSubmit = () => {
    if (chatInput.trim()) {
      setChatMessages(prev => [...prev, chatInput]);
      setChatInput('');
    }
  };

  return (
    <div className="w-full bg-gray-100">
      <Herosection />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-end mb-4 space-x-2">
          <button
            onClick={handlePrev}
            disabled={currentGroup === 0}
            className="p-2 bg-white rounded shadow transition hover:bg-purple-50 disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button
            onClick={handleNext}
            disabled={currentGroup === totalGroups - 1}
            className="p-2 bg-white rounded shadow transition hover:bg-purple-50 disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentPosts.map(post => {
            const postReactions = reactions[post.id] || {};
            const postComments = comments[post.id] || [];
            const isExpanded = expandedPostId === post.id;
            const showReactions = showReactionsId === post.id;
            const showComment = showCommentInput === post.id;

            return (
              <div
                key={post.id}
                className={`bg-white rounded-xl shadow-md p-4 relative transform transition-transform duration-300 hover:scale-105 ${
                  isExpanded ? 'z-10 bg-purple-50' : ''
                }`}
              >
                <img
                  src={post.image}
                  alt="Blog visual"
                  className="w-full h-40 object-cover rounded mb-3"
                />
                <h2 className="text-lg font-bold text-purple-900 truncate mb-2">
                  {post.title}
                </h2>
                <p
                  className={`text-sm text-gray-700 mb-2 whitespace-pre-wrap transition-max-h duration-500 overflow-hidden ${
                    isExpanded ? 'max-h-full' : 'max-h-16'
                  }`}
                >
                  {post.content}
                </p>
                <button
                  className="text-purple-600 text-sm mb-2"
                  onClick={() => setExpandedPostId(prev => (prev === post.id ? null : post.id))}
                >
                  {isExpanded ? 'Show Less' : 'Read More'}
                </button>

                <div className="flex justify-between text-sm text-gray-500">
                  <span>{post.date}</span>
                  <div className="flex space-x-2 relative">
                    <button
                      onClick={() => setShowReactionsId(prev => (prev === post.id ? null : post.id))}
                      className="relative"
                    >
                      <FontAwesomeIcon icon={faFaceSmile} />
                    </button>
                    {showReactions && (
                      <div className="absolute right-0 top-full mt-1 bg-white border rounded-lg shadow-lg p-2 grid grid-cols-5 gap-2 animate-fade-in">
                        {['👍', '❤️', '🔥', '👏', '🎉'].map(emoji => (
                          <button
                            key={emoji}
                            onClick={() => handleAddReaction(post.id, emoji)}
                            className="p-1 hover:bg-gray-100 rounded transition-transform transform hover:scale-125"
                          >
                            {emoji} {postReactions[emoji] || 0}
                          </button>
                        ))}
                      </div>
                    )}
                    <button onClick={() => setShowCommentInput(prev => (prev === post.id ? null : post.id))}>
                      <FontAwesomeIcon icon={faComment} />
                    </button>
                    <button onClick={handleShare}>
                      <FontAwesomeIcon icon={faShare} />
                    </button>
                  </div>
                </div>

                {showComment && (
                  <div className="mt-2 animate-fade-in flex flex-col space-y-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={e => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      className="w-full p-2 border rounded text-sm"
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleCommentSubmit(post.id)}
                        className="bg-purple-600 text-white px-3 py-1 rounded text-sm transition hover:bg-purple-700"
                      >
                        Submit
                      </button>
                      <button
                        onClick={() => setShowCommentInput(null)}
                        className="text-gray-500 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {postComments.length > 0 && (
                  <ul className="mt-4 text-sm space-y-1 animate-fade-in">
                    {postComments.map(comment => (
                      <li key={comment.id} className="bg-gray-100 p-2 rounded">
                        <p>{comment.text}</p>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.date).toLocaleString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        <style jsx>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fade-in 0.3s ease-out; }
        `}</style>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <button onClick={() => setShowChat(!showChat)} className="p-4 bg-purple-600 text-white rounded-full shadow-lg transition hover:bg-purple-700">
          <FontAwesomeIcon icon={faComments} size="lg" />
        </button>

        {showChat && (
          <div className="absolute bottom-20 right-0 w-80 bg-white rounded-lg shadow-xl animate-fade-in">
            <div className="p-4 border-b font-bold">Chatbot</div>
            <div className="h-48 p-4 overflow-y-auto">
              {chatMessages.map((msg, i) => (
                <div key={i} className="text-sm text-gray-700 mb-2">You: {msg}</div>
              ))}
            </div>
            <div className="p-4 border-t flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded text-sm"
              />
              <button onClick={handleChatSubmit} className="bg-purple-600 text-white px-3 rounded transition hover:bg-purple-700">Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
