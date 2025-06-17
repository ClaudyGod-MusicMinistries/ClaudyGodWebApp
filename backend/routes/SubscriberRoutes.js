const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and Email Address is Required...'
      });
    }

    const newSubscriber = new Subscriber({ name, email });
    await newSubscriber.save();
    res.status(201).json({ success: true,
      message: 'Subscribed successfully',
      data:newSubscriber });
  } catch (error) {
    console.error('Subscription error:', error);
    if (error.code === 11000) {
      return res.status(409).json({ success: false,
        message: 'Email already subscribed',
      error: error.message});
    }
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;