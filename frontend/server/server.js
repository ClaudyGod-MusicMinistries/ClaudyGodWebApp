// server/server.js (updated)
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet'); // Security middleware
const compression = require('compression'); // Compress responses

const app = express();
const PORT = process.env.PORT || 5000;

// Production Middleware
app.use(helmet()); // Add security headers
app.use(compression()); // Compress responses
app.use(express.json()); // Replaces bodyParser.json()

// MongoDB Connection
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes (unchanged)
app.use('/api/contacts', require('./routes/ContactRoutes'));
app.use('/api/volunteers', require('./routes/volunteerRoutes'));
app.use('/api/subscribers', require('./routes/SubscribeRoutes'));
app.use('/api/bookings', require('./routes/bookingsRoutes'));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error Handler (new)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});