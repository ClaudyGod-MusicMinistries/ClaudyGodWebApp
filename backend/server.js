require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Booking = require('./models/Booking');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Booking Form Submission Endpoint
app.post('/api/bookings', async (req, res) => {
  try {
    const bookingData = req.body;
    
    // Basic validation
    if (!bookingData.email || !bookingData.phone) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const newBooking = new Booking(bookingData);
    await newBooking.save();
    
    res.status(201).json({ 
      message: 'Booking request submitted successfully! We will contact you shortly.',
      bookingId: newBooking._id
    });
  } catch (error) {
    console.error('Booking submission error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));