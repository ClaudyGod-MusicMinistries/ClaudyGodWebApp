// src/components/news/TourCityModal.tsx
import { useState, ChangeEvent, FormEvent } from 'react';

export const TourCityModal = ({
  city,
  isOpen,
  onClose,
}: {
  city: string | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: city || '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      // Auto-close after success
      setTimeout(() => {
        onClose();
      }, 3000);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#140f3c] border border-purple-800 rounded-xl w-full max-w-md overflow-hidden">
        <div className="p-4 md:p-6 border-b border-purple-800 flex justify-between items-center">
          <h3 className="text-lg md:text-xl roboto-condensed text-white">
            Tour Registration
          </h3>
          <button
            onClick={onClose}
            className="text-purple-300 hover:text-white transition-colors"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-4 md:p-6">
          {submitted ? (
            <div className="text-center py-6 md:py-8">
              <div className="text-green-500 text-4xl md:text-5xl mb-3 md:mb-4">
                ✓
              </div>
              <h4 className="text-lg md:text-xl text-white mb-1 md:mb-2">
                Submitted Successfully!
              </h4>
              <p className="text-purple-200 text-sm md:text-base">
                We will reach out to you once we arrive in {city}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-purple-200 mb-2 text-sm md:text-base">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 md:px-4 md:py-3 bg-[#0a061a] border border-purple-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white text-sm md:text-base"
                  />
                </div>

                <div>
                  <label className="block text-purple-200 mb-2 text-sm md:text-base">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 md:px-4 md:py-3 bg-[#0a061a] border border-purple-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white text-sm md:text-base"
                  />
                </div>

                <div>
                  <label className="block text-purple-200 mb-2 text-sm md:text-base">
                    City
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 md:px-4 md:py-3 bg-[#0a061a] border border-purple-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white text-sm md:text-base appearance-none"
                  >
                    <option value="">Select a city</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Aba">Aba</option>
                    <option value="Owerri">Owerri</option>
                    <option value="Portharcourt">Portharcourt</option>
                    <option value="Abuja">Abuja</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2.5 md:py-3.5 bg-gradient-to-r from-purple-800 to-purple-600 text-white rounded-lg shadow-lg transition-all font-medium text-sm md:text-base ${
                    loading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
                  }`}
                >
                  {loading ? 'Submitting...' : 'Submit Registration'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};