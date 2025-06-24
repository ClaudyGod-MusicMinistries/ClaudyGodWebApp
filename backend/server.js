require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const https = require('https');

// Import routers - FIXED CASE SENSITIVITY
const subscriberRoutes = require('./routes/SubscriberRoutes');
const contactRoutes = require('./routes/ContactRoutes');
const bookingsRoutes = require('./routes/bookingsRoutes'); // Lowercase 'b'
const volunteerRoutes = require('./routes/volunteerRoutes');
const paymentRoutes = require('./routes/paymentRoutes');


const app = express();
const PORT = process.env.PORT || 10000;

// === Enhanced CORS Configuration ===
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(o => o.trim()).filter(o => o)
  : [];

console.log('Allowed Origins:', allowedOrigins);

// CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (process.env.NODE_ENV === 'development') return callback(null, true);
    if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      console.error(`CORS blocked: ${origin} | Allowed: ${allowedOrigins.join(', ')}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



// === Middleware ===
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// === Database connection ===
(async () => {
  try {
    if (!process.env.DB_URI) throw new Error('DB_URI not set');
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ DB connection error:', err.message);
    process.exit(1);
  }
})();

// === Routes ===
app.get('/', (req, res) => res.json({
  status: 'running', version: '1.0.0', ts: new Date(), env: process.env.NODE_ENV
}));

app.use('/api/subscribers', subscriberRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/bookings', bookingsRoutes); // Keep if you have the file
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/payment', paymentRoutes);


// Health check
app.get('/health', (_, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', path: req.originalUrl });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.stack || err.message);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Keep-alive ping
if (process.env.NODE_ENV === 'production' && process.env.KEEP_ALIVE_URL) {
  setInterval(() => {
    https.get(`${process.env.KEEP_ALIVE_URL}/health`, () => {})
      .on('error', err => console.error('Keep-alive error:', err.message));
  }, 240000); // Every 4 minutes
}

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => shutdown(server));
process.on('SIGTERM', () => shutdown(server));

async function shutdown(server) {
  console.log('🛑 Shutting down...');
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('MongoDB disconnected');
      process.exit(0);
    });
  });
}