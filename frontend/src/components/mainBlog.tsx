import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faComment, 
  faShare, 
  faFaceSmile 
} from '@fortawesome/free-solid-svg-icons';

interface Comment {
  id: string;
  text: string;
  date: string;
}

interface Reactions {
  [key: string]: number;
}

interface BlogPostProps {
  id: string;
  title: string;
  content: string;
  date: string;
  image: string;
  reactions: Reactions;
  comments: Comment[];
  onAddReaction: (postId: string, emoji: string) => void;
  onAddComment: (postId: string, comment: string) => void;
  onShare: () => void;
}

export const BlogPost: React.FC<BlogPostProps> = ({
  id,
  title,
  content,
  date,
  image,
  reactions,
  comments,
  onAddReaction,
  onAddComment,
  onShare
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      onAddComment(id, newComment);
      setNewComment('');
      setShowCommentInput(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col h-full transform transition-transform duration-300 hover:scale-102 hover:shadow-lg">
      <div className="relative w-full h-48 mb-4">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      
      <h2 className="text-xl font-bold text-purple-900 mb-3">{title}</h2>
      
      <div className="flex-grow">
        <p className={`text-gray-700 mb-3 whitespace-pre-wrap transition-all duration-300 ${
          isExpanded ? 'max-h-full' : 'max-h-20 overflow-hidden'
        }`}>
          {content}
        </p>
        
        <button
          className="text-purple-600 font-medium text-sm mb-4 hover:text-purple-800 transition"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show Less' : 'Read More'}
        </button>
      </div>

      <div className="border-t pt-3 mt-2">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>{date}</span>
          <div className="flex space-x-4 relative">
            <button
              onClick={() => setShowReactions(!showReactions)}
              className="hover:text-purple-700 transition"
              aria-label="React"
            >
              <FontAwesomeIcon icon={faFaceSmile} />
            </button>
            
            <button
              onClick={() => setShowCommentInput(!showCommentInput)}
              className="hover:text-purple-700 transition"
              aria-label="Comment"
            >
              <FontAwesomeIcon icon={faComment} />
            </button>
            
            <button
              onClick={onShare}
              className="hover:text-purple-700 transition"
              aria-label="Share"
            >
              <FontAwesomeIcon icon={faShare} />
            </button>
          </div>
        </div>

        {showReactions && (
          <div className="mt-3 bg-white border rounded-lg shadow-md p-2 animate-fade-in">
            <div className="grid grid-cols-5 gap-2">
              {['👍', '❤️', '🔥', '👏', '🎉'].map(emoji => (
                <button
                  key={emoji}
                  onClick={() => onAddReaction(id, emoji)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-transform transform hover:scale-110 flex flex-col items-center"
                >
                  <span className="text-lg">{emoji}</span>
                  <span className="text-xs text-gray-600">{reactions[emoji] || 0}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {Object.keys(reactions).length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {Object.entries(reactions)
              .filter(([_, count]) => count > 0)
              .map(([emoji, count]) => (
                <span key={emoji} className="inline-flex items-center px-2 py-1 bg-gray-100 rounded-full text-xs">
                  {emoji} {count}
                </span>
              ))}
          </div>
        )}

        {showCommentInput && (
          <div className="mt-3 animate-fade-in">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full p-2 border rounded text-sm resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={2}
            />
            <div className="flex justify-end space-x-2 mt-2">
              <button
                onClick={handleCommentSubmit}
                className="bg-purple-600 text-white px-3 py-1 rounded text-sm transition hover:bg-purple-700"
              >
                Submit
              </button>
              <button
                onClick={() => setShowCommentInput(false)}
                className="text-gray-500 text-sm hover:text-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {comments.length > 0 && (
          <div className="mt-3">
            <h4 className="font-medium text-sm text-gray-700 mb-2">Comments</h4>
            <ul className="space-y-2">
              {comments.map(comment => (
                <li key={comment.id} className="bg-gray-50 p-2 rounded text-sm">
                  <p className="text-gray-800">{comment.text}</p>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.date).toLocaleDateString(undefined, { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

