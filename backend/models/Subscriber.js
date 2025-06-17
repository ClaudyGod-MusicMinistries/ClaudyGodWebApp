const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email required'],
    lowercase: true,
    trim: true,
    unique: true,
    match: [/.+@.+\..+/, 'Invalid email'],
  }
}, { timestamps: true });

module.exports = mongoose.model('Subscriber', subscriberSchema);
