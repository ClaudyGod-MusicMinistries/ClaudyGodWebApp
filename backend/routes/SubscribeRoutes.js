const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newSubscriber = new Subscriber({ name, email });
    await newSubscriber.save();
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;