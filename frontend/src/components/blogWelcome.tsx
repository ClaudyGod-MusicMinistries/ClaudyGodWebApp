import React from 'react';

const BlogWelcome: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="md:text-6xl max-md:text-5xl max-md:text-center roboto-condensed text-gray-900 tracking-tight">
        Welcome to  <span className="text-purple-700">ClaudyGod Community</span>
      </h2>
      
      <p className="work-sans max-md:text-sm md:text-base text-gray-600 leading-relaxed">
        This is a vibrant and uplifting community where we come together in faith to edify one another through the teachings of Christ. We are devoted to spiritual growth, mutual encouragement, and the sharing of gospel-inspired materials. Whether through sermons, devotionals, worship music, or insightful discussions, we strive to build a Christ-centered atmosphere where every believer is empowered and equipped to walk boldly in their faith.
      </p>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-purple-700">✓</span>
            </div>
          </div>
          <p className="ml-3 max-md:text-xx raleway-medium md:text-sm text-gray-700">
            Engage with thought-provoking content across diverse topics
          </p>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-purple-700">✓</span>
            </div>
          </div>
          <p className="ml-3 max-md:text-xx md:text-sm raleway-medium text-gray-700">
            Share your perspectives and join meaningful discussions
          </p>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-purple-700">✓</span>
            </div>
          </div>
          <p className="ml-3 max-md:text-xx md:text-sm raleway-medium text-gray-700">
            Connect with like-minded individuals passionate about learning
          </p>
        </div>
      </div>
      
      <div className="flex justify-center md:justify-start">
  <button className="mt-6 cursor-pointer roboto-condensed md:text-2xl px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white font-medium rounded-lg transition duration-300 transform hover:-translate-y-1 block mx-auto md:mx-0">
    Be Part of Our Community
  </button>
</div>
    </div>
  );
};

export default BlogWelcome;