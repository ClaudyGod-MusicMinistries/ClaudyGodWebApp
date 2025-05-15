import React, { useState } from 'react';
import { Herosection } from '../components/Herosection';
import { VideoBanner2 } from '../assets/'
import { NewsletterForm } from '../components/Newsletter';

export const Booking: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: 'US',
    organization: '',
    orgType: '',
    eventType: '',
    day: '',
    month: '',
    year: '',
    eventDetails: '',
    address1: '',
    address2: '',
    country: '',
    state: '',
    city: '',
    zipCode: '',
    agreeTerms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Booking request submitted successfully! We will contact you shortly.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="bg-white min-h-screen overflow-y-auto">
      <div className="relative">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <Herosection 
          title="ClaudyGod Music & Ministries / Bookings"
          backgroundImage={VideoBanner2}
          className="relative z-0"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className=" text-gray-900 mb-2 roboto-condensed text-40">ClaudyGod Music Ministry</h2>
          <div className="h-1 w-16 bg-purple-900 mb-3"></div>
          <p className="text-gray-700 mb-2 robotoMedium text-18">
            To book ClaudyGod for an event, fill out the form below. The ClaudyGod Team will review your information.
          </p>
          <p className="text-gray-700 robotoMedium text-18">
            Thank you in advance for your gracious invitation to be a part of your event.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-purple-900 p-8 rounded-lg shadow-md text-white mb-8">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="firstName" className="block text-sm robotoMedium mb-1">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm robotoMedium mb-1">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm robotoMedium mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="phone" className="block text-sm robotoMedium mb-1">Contact Number</label>
            <div className="flex">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleInputChange}
                className="px-3 py-2 border border-purple-700 rounded-l-md bg-purple-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="US">US</option>
                <option value="CA">CA</option>
                <option value="UK">UK</option>
              </select>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="flex-1 px-3 py-2 border border-purple-700 border-l-0 rounded-r-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          {/* Event Information */}
          <h3 className="text-xl font-bold mt-8 mb-4 roboto-condensed uppercase">Event Information</h3>

          <div className="mb-6">
            <label htmlFor="organization" className="block text-sm robotoMedium mb-1">Organization Name/Host</label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter Name of Organization or Host Here"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm robotoMedium mb-1">Type Of Organization</label>
            <div className="flex flex-wrap gap-4">
              {['Church', 'Promoter', 'Non Profit', 'Others'].map((type) => (
                <label key={type} className="inline-flex items-center raleway-slider">
                  <input
                    type="radio"
                    name="orgType"
                    value={type}
                    checked={formData.orgType === type}
                    onChange={handleInputChange}
                    className="form-radio text-purple-500"
                  />
                  <span className="ml-2">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm robotoMedium mb-1">Type Of Event/Program</label>
            <div className="flex flex-wrap gap-4">
              {['Worship Evening', 'Concert', 'Others'].map((type) => (
                <label key={type} className="inline-flex items-center raleway-slider">
                  <input
                    type="radio"
                    name="eventType"
                    value={type}
                    checked={formData.eventType === type}
                    onChange={handleInputChange}
                    className="form-radio text-purple-500"
                  />
                  <span className="ml-2">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm robotoMedium mb-1">Date Of Event</label>
            <div className="grid grid-cols-3 gap-2">
              <select
                name="day"
                value={formData.day}
                onChange={handleInputChange}
                className="px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="" className='raleway-slider'>DD</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <select
                name="month"
                value={formData.month}
                onChange={handleInputChange}
                className="px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="" className='raleway-slider'>MM</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <select
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="" className='raleway-slider'>YYYY</option>
                {Array.from({ length: 10 }, (_, i) => {
                  const year = new Date().getFullYear() + i;
                  return <option key={year} value={year}>{year}</option>;
                })}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="eventDetails" className="block text-sm robotoMedium mb-1">Share Event Details</label>
            <textarea
              id="eventDetails"
              name="eventDetails"
              value={formData.eventDetails}
              onChange={handleInputChange}
              rows={5}
              className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            ></textarea>
          </div>

          {/* Event Location */}
          <h3 className="text-xl robotoMedium mt-8 mb-4 uppercase">Event Location</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="address1" className="block text-sm font-medium mb-1">Address 1</label>
              <input
                type="text"
                id="address1"
                name="address1"
                value={formData.address1}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label htmlFor="address2" className="block text-sm robotoMedium mb-1">Address 2</label>
              <input
                type="text"
                id="address2"
                name="address2"
                value={formData.address2}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm robotoMedium mb-1">Location</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value=""className='raleway-slider'>Country</option>
                <option value="United States" className='raleway-slider'>United States</option>
                <option value="Canada" className='raleway-slider'>Canada</option>
                <option value="United Kingdom" className='raleway-slider'>United Kingdom</option>
                <option value="Nigeria" className='raleway-slider'>Nigeria</option>
              </select>
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="" className='raleway-slider'>State</option>
                <option value="California" className='raleway-slider'>California</option>
                <option value="Texas" className='raleway-slider'>Texas</option>
                <option value="New York" className='raleway-slider'>New York</option>
              </select>
              <select
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="" className='raleway-slider'>City</option>
                <option value="San Ramon" className='raleway-slider'>San Ramon</option>
                <option value="Los Angeles" className='raleway-slider'>Los Angeles</option>
                <option value="San Francisco" className='raleway-slider'>San Francisco</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="zipCode" className="block text-sm font-medium mb-1">ZIP Code</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="mb-8 text-sm">
            <p className="mb-4 robotoMedium">
              By submitting this Request Form, you acknowledge that you will receive emails from the ClaudyGod Team.
              This submission is only a request and does not guarantee participation in the event. Request information
              is needed for processing, and a team member of ClaudyGod will contact you after review.
            </p>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
                className="form-checkbox text-purple-500"
                required
              />
              <span className="ml-2 robotoMedium">By proceeding, you agree to our Terms of Use and Services.</span>
            </label>
          </div>

          <button 
            type="submit" 
            className="w-full md:w-auto bg-purple-800 hover:bg-purple-700 roboto-condensed border-1 cursor-pointer border-white text-white font-medium py-3 px-8 rounded-md transition duration-150 ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>
      <hr className="my-8 border-purple-900" />
      <NewsletterForm />
    </div>
  );
};