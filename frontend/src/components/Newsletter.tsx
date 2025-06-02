import { useState } from 'react';

export const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');



  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email });
    setName('');
    setEmail('');
    alert('Thank you for subscribing to our newsletter!');
  };

  return (
    <div className="bg-white py-24 px-4"> {/* Increased vertical padding */}
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="text-center mb-12"> {/* Increased bottom margin */}
          <h3 className=" md:text-3xl lg:text-5xl xl:text-5xl text-gray-900 mb-4 roboto-condensed"> {/* Larger text and spacing */}
            Stay Up To Date
          </h3>
          <div className="h-1 w-12 sm:w-16 md:w-20 lg:w-24 bg-purple-900 mx-auto mb-6"></div>
          <p className="md:text-base lg:text-5xl xl:text-base mx-auto raleway-light "> {/* Larger text and max-width */}
            Sign up for the newsletter and get the latest updates delivered right to your inbox.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto"> {/* Centered form container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"> {/* Grid layout for inputs */}
            <div>
              <label htmlFor="name" className="block text-sm roboto-condensed text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border work-sans border-gray-300 rounded-lg focus:outline-none focus:ring-2 slider-font text-15 focus:ring-purple-500"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm roboto-condensed text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border work-sans text-15 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>
          <div className="text-center">
            <button 
              type="submit" 
              className="bg-purple-900 hover:bg-purple-800 cursor-pointer roboto-condensed text-15 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 transform hover:scale-105"
            >
              Subscribe Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};