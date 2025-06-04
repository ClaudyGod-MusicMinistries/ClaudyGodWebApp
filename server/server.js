require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection - UPDATED
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Booking Schema - ADDED VALIDATION
const bookingSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  countryCode: { type: String, required: true },
  organization: { type: String, required: true },
  orgType: { type: String, required: true },
  eventType: { type: String, required: true },
  eventDetails: { type: String, required: true },
  day: { type: Number, required: true, min: 1, max: 31 },
  month: { type: String, required: true },
  year: { type: Number, required: true },
  eventImage: { type: String, required: true },
  address1: { type: String, required: true },
  address2: String,
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  agreeTerms: { type: Boolean, required: true },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter - ADDED SECURITY
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'), false);
  }
};

const upload = multer({ 
  storage, 
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// UPDATED BOOKING ENDPOINT
app.post('/api/bookings', upload.single('eventImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Event image is required' });
    }

    // Create booking object with proper data types
    const bookingData = {
      ...req.body,
      eventImage: `/uploads/${req.file.filename}`,
      agreeTerms: req.body.agreeTerms === 'true',
      day: parseInt(req.body.day, 10),
      year: parseInt(req.body.year, 10)
    };

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'organization', 
      'orgType', 'eventType', 'eventDetails', 'month', 'address1',
      'country', 'state', 'city', 'zipCode'];
    
    for (const field of requiredFields) {
      if (!bookingData[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    // Save to MongoDB
    const newBooking = new Booking(bookingData);
    await newBooking.save();

    res.status(201).json({
      message: 'Booking saved successfully',
      bookingId: newBooking._id
    });
  } catch (error) {
    console.error('Error saving booking:', error);
    
    // Clean up uploaded file if error occurs
    if (req.file) {
      fs.unlink(req.file.path, err => {
        if (err) console.error('Error deleting file:', err);
      });
    }
    
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});