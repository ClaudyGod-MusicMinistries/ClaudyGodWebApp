// src/components/news/VolunteerForm.tsx
import { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';

export const VolunteerForm = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    reason: '',
  });
 const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    try {
      // Send a POST to /api/volunteers with the form data
      const response = await fetch('http://localhost:5000/api/volunteers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        // If back-end returns 4xx/5xx, show an error
        const err = await response.json();
        throw new Error(err.message || 'Failed to submit volunteer form.');
      }

      // If successful, mark as submitted and clear form
      setSubmitted(true);
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        reason: '',
      });
    } catch (err: any) {
      console.error('Error when submitting volunteer form:', err);
      setErrorMsg(err.message ?? 'Something went wrong. Please try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-[#1a0a2e] rounded-2xl p-6 md:p-8 shadow-xl"
    >
      <h3 className="text-xl md:text-2xl roboto-condensed text-white mb-6 text-center">
        Volunteer to be part of our Music Tour
      </h3>

      {submitted ? (
        <div className="text-center py-8">
          <div className="text-green-500 text-5xl mb-4">✓</div>
          <h4 className="text-xl text-white mb-2">
            Thank You for Volunteering!
          </h4>
          <p className="text-purple-200">We'll contact you soon with more details.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMsg && (
            <div className="text-red-500 text-sm md:text-base bg-red-100/10 p-3 rounded-lg">
              {errorMsg}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-purple-200 mb-2 text-sm md:text-base"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 md:px-4 md:py-3 bg-[#0a061a] border border-purple-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white text-sm md:text-base"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-purple-200 mb-2 text-sm md:text-base"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 md:px-4 md:py-3 bg-[#0a061a] border border-purple-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white text-sm md:text-base"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-purple-200 mb-2 text-sm md:text-base"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 md:px-4 md:py-3 bg-[#0a061a] border border-purple-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white text-sm md:text-base"
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-purple-200 mb-2 text-sm md:text-base"
            >
              Volunteering as
            </label>
            <select
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 md:px-4 md:py-3 bg-[#0a061a] border border-purple-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white text-sm md:text-base appearance-none"
            >
              <option value="">Select a role</option>
              <option value="backup-singer">Backup Singer</option>
              <option value="protocol">Protocol</option>
              <option value="media">Media</option>
              <option value="security">Security</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="reason"
              className="block text-purple-200 mb-2 text-sm md:text-base"
            >
              Reason for Volunteering
            </label>
            <textarea
              id="reason"
              name="reason"
              value={form.reason}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 md:px-4 md:py-3 bg-[#0a061a] border border-purple-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white text-sm md:text-base"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 md:py-3.5 bg-gradient-to-r from-purple-800 to-purple-600 text-white rounded-lg shadow-lg hover:opacity-90 transition-all font-medium text-sm md:text-base"
          >
            Submit Volunteer Application
          </button>
        </form>
      )}
    </motion.div>
  );
};