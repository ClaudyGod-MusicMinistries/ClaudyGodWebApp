// server/server.js (debugged and updated)
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - ORDER MATTERS!
// app.use(cors({
//   origin: process.env.CORS_ORIGIN || 'https://loader-ways.onrender.com',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// })); 
// server.js
const allowedOrigins = [
  process.env.CORS_ORIGIN,       // https://loader-ways.onrender.com
  'http://localhost:3000',       // dev React
];
app.use(cors({ origin: allowedOrigins }));

// Add security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://www.youtube.com"],
      styleSrc: ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'", process.env.CORS_ORIGIN]
    }
  }
}));
app.use(compression());
app.use(express.json());

app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=3600');
  next();
});


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