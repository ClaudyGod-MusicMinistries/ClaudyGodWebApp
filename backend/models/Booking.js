const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  countryCode: { type: String, default: 'US' },
  organization: { type: String, required: true },
  orgType: { type: String, required: true },
  eventType: { type: String, required: true },
  eventDate: {
    day: { type: Number, required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true }
  },
  eventDetails: { type: String, required: true },
  address1: { type: String, required: true },
  address2: String,
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  agreeTerms: { type: Boolean, required: true },
  submissionDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);