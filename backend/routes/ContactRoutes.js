// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { body, validationResult } = require('express-validator');

router.post('/', 
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('message').trim().notEmpty().withMessage('Message is required')
  ],
  async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, message } = req.body;
      
      const newContact = new Contact({
        name,
        email,
        message
      });

      await newContact.save();
      res.status(201).json({ 
        message: 'Message sent successfully!',
        contact: {
          id: newContact._id,
          createdAt: newContact.createdAt
        }
      });
    } catch (error) {
      console.error('Error saving contact:', error);
      res.status(500).json({ 
        message: 'Internal server error',
        error: error.message 
      });
    }
  }
);

// Add this for debugging
router.get('/', (req, res) => {
  res.json({ message: 'Contact endpoint is working' });
});

module.exports = router;