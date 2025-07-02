import React from 'react';

export const Heroblog: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-purple-800 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <h1 className="font-roboto-condensed md:text-8xl max-md:text-5xl  tracking-tight mb-6">
          Our Blog
        </h1>
        <p className="text-lg sm:text-xl font-work-sans max-w-2xl mx-auto mb-10">
          Feel free to share your thoughts in our community
        </p>
        <div className="relative max-w-lg w-full">
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full px-5 py-3 rounded-full raleway-light bg-opacity-20 border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-b from-transparent to-gray-100"></div>
    </div>
  );
};