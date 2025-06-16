const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  name: {  // Changed from 'Name' to 'name'
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
    unique: true  // Prevent duplicate subscriptions
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Subscriber', subscriberSchema);