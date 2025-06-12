// server/server.js (debugged and updated)
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors'); 

const app = express();
const PORT = process.env.API_URL || 5000;

// Middleware - ORDER MATTERS!
app.use(cors()); // ADDED: Must come first to handle CORS
app.use(helmet());
app.use(compression());
app.use(express.json());


mongoose.connect(process.env.DB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/contacts', require('./routes/ContactRoutes'));
app.use('/api/volunteers', require('./routes/volunteerRoutes'));
app.use('/api/subscribers', require('./routes/SubscribeRoutes'));
app.use('/api/bookings', require('./routes/bookingsRoutes'));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});