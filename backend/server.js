require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Trust Render's proxy
app.set('trust proxy', true);

// Redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (req.secure || req.headers.host === 'localhost:' + PORT) {
    next();
  } else {
    res.redirect('https://' + req.headers.host + req.url);
  }
});

// Test MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 3000
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection failed:', err.message));

// Test Server
app.get('/', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.send(`
    <h1>Server Running</h1>
    <p>Port: ${PORT}</p>
    <p>MongoDB: ${dbStatus}</p>
    <p>Protocol: ${req.protocol}</p>
  `);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});