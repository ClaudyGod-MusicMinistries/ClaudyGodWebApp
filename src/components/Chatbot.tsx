import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  timestamp: number;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-responses for the chatbot
  const autoResponses = [
    "Thanks for your message! How can I help you today?",
    "That's interesting! Would you like to know more about our blog topics?",
    "Great question! Our blog covers a variety of topics from technology to lifestyle.",
    "Feel free to check out our latest blog posts for more information on that!",
    "I'm here to help! Let me know if you have any other questions.",
    "You might find some relevant information in our blog archives.",
    "Have you tried using the search feature to find specific blog posts?",
    "I'd be happy to guide you to relevant articles on that topic."
  ];
  
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          sender: 'bot',
          text: 'Hello! Welcome to our blog. How can I assist you today?',
          timestamp: Date.now()
        }
      ]);
    }
  }, [isOpen, messages.length]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim() === '') return;
    

    const userMessage: Message = {
      sender: 'user',
      text: input,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    

    setTimeout(() => {
      const randomResponse = autoResponses[Math.floor(Math.random() * autoResponses.length)];
      
      const botMessage: Message = {
        sender: 'bot',
        text: randomResponse,
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 bg-white rounded-lg shadow-xl animate-fade-in overflow-hidden">
          <div className="bg-purple-600 text-white p-3 flex justify-between items-center">
            <h3 className="font-medium">Blog Assistant</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-purple-200 transition"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          
          <div className="h-64 overflow-y-auto p-3 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 max-w-[80%] ${
                  message.sender === 'user' 
                    ? 'ml-auto bg-purple-100 rounded-l-lg rounded-tr-lg' 
                    : 'mr-auto bg-white border rounded-r-lg rounded-tl-lg'
                } p-2 shadow-sm`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSendMessage} className="p-3 border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button 
              type="submit" 
              className="bg-purple-600 text-white p-2 rounded transition hover:bg-purple-700"
              aria-label="Send message"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="p-4 bg-purple-600 text-white rounded-full shadow-lg transition hover:bg-purple-700"
        aria-label="Toggle chat"
      >
        <FontAwesomeIcon icon={faComments} size="lg" />
      </button>
    </div>
  );
};

export default Chatbot;