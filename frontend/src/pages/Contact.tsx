import  { useState } from 'react';
import { Herosection } from '../components/Herosection';
import { Log } from '../assets/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NewsletterForm } from '../components/Newsletter';
import { 
  faMapPin,
  faPhone,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';

export const ContactData: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setFormData({ name: '', email: '', message: '' });
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className="bg-white">
      <div className="relative">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <Herosection 
          title="ClaudyGod Music & Ministries / Contact"
          backgroundImage={Log}
          className="relative z-0"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-35 roboto-condensed text-purple-900 mb-6 inline-block px-16 py-4 border-b-2 border-purple-900">
            We Are Here For You
          </h2>
          <p className="text-gray-700 robotoMedium mt-4 max-w-2xl mx-auto">
            Please leave a prayer request, testimony or a comment. We are happy to pray and stand in agreement with you concerning God’s purposes being fulfilled in your life. We would also love to hear your testimony of what’s God’s doing. Additionally you can kindly leave your comments or any questions you may have. 
Be richly blessed.
          </p>
        </div>

        <h3 className="text-gray-900 mb-6 roboto-condensed text-40">Get In Touch With Us</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm robotoMedium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter Name Here"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm robotoMedium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter Email Address"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm robotoMedium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Write Your Message Here. Max 250 Words"
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="bg-purple-900 hover:bg-purple-800 robotoMedium cursor-Pointer text-white font-medium py-3 px-8 rounded-md transition duration-150 ease-in-out"
              >
                Submit
              </button>
            </form>
          </div>
          
          <div>
            <h3 className="text-25 roboto-condensed text-gray-900 mb-6">Management & General Inquiries</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <FontAwesomeIcon 
                  icon={faMapPin} 
                  className="text-purple-900 mt-1 mr-3 flex-shrink-0 text-lg"
                />
                <div>
                  <p className="slider-font">ClaudyGod Music & Ministries</p>
                  <p>San Ramon, California</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <FontAwesomeIcon 
                  icon={faPhone} 
                  className="text-purple-900 mr-3 flex-shrink-0 text-lg"
                />
                <p>+1(385)219-6632</p>
              </div>
              
              <div className="flex items-center">
                <FontAwesomeIcon 
                  icon={faEnvelope} 
                  className="text-purple-900 mr-3 flex-shrink-0 text-lg"
                />
                <a href="mailto:info@ClaudyGod.com" className="hover:underline">info@ClaudyGod.com</a>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg font-medium text-gray-900 mb-3">Connect With Us</h4>
              {/* Add social links here */}
            </div>
          </div>
        </div>

        <hr className="my-8 border-purple-900" />
        <NewsletterForm />
      </div>

      <div className="bg-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">ClaudyGod Music & Ministries</h2>
            <p className="text-lg mb-6">Connect With Us On Various Social Platforms</p>
            <div className="flex justify-center">
              {/* Add social links here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};