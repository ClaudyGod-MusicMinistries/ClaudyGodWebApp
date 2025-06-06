const express = require('express');
const router = express.Router();
const Subscribe = require('../models/subscribe');

router.post('/', async (req, res) => {
    try {
           const { name, email } = req.body;
            
            const newSubscriber = new Subscribe({
              name,
              email,   
            });
            
    const savedSubscriber = await newSubscriber.save();
    return res.status(201).json(savedSubscriber);
  } catch (error) {
    console.error('Error creating volunteer:', error);
    
  if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    
    return res.status(500).json({ message: 'Server error' });
  }
  });


module.exports = router;


