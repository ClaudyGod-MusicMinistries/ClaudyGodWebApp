const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// POST new booking
router.post('/', async (req, res) => {
  try {
    // Transform country code to uppercase
    const bookingData = {
      ...req.body,
      countryCode: req.body.countryCode?.toUpperCase()
    };
    
    const newBooking = new Booking(bookingData);
    const savedBooking = await newBooking.save();
    
    res.status(201).json({
      message: 'Booking submitted successfully!',
      booking: savedBooking
    });
  } catch (error) {
    console.error('Error saving booking:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: 'Validation failed', errors });
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'Duplicate value detected',
        field: Object.keys(error.keyPattern)[0]
      });
    }
    
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;