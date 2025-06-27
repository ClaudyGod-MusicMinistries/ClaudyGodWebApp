require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const https = require('https');

// Keep all your existing routes
const subscriberRoutes = require('./routes/SubscriberRoutes');
const contactRoutes = require('./routes/ContactRoutes');
const bookingsRoutes = require('./routes/bookingsRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const paymentRoutes = require('./routes/paymentRoutes'); // Updated payment routes
const orderRouter = require("./routes/orderRoutes"); // Updated order routes

const app = express();
const PORT = process.env.PORT || 10000;

// Enhanced CORS Configuration (keep your existing setup)
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(o => o.trim()).filter(o => o)
  : [];

console.log('Allowed Origins:', allowedOrigins);

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

// Middleware (keep your existing setup)
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

// Request logger (keep your existing setup)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Database connection (keep your existing setup)
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

// Keep all your existing routes
app.get('/', (req, res) => res.json({
  status: 'running', version: '1.0.0', ts: new Date(), env: process.env.NODE_ENV
}));

app.use('/api/subscribers', subscriberRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/volunteers', volunteerRoutes);

// Add/keep the payment and order routes
app.use('/api/payment', paymentRoutes); // Updated payment routes
app.use("/api/order", orderRouter); // Updated order routes

// Health check (keep your existing setup)
app.get('/health', (_, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// 404 handler (keep your existing setup)
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', path: req.originalUrl });
});

// Global error handler (keep your existing setup)
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.stack || err.message);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Keep-alive ping (keep your existing setup)
if (process.env.NODE_ENV === 'production' && process.env.KEEP_ALIVE_URL) {
  setInterval(() => {
    https.get(`${process.env.KEEP_ALIVE_URL}/health`, () => {})
      .on('error', err => console.error('Keep-alive error:', err.message));
  }, 240000); // Every 4 minutes
}

// Start server (keep your existing setup)
const server = app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});

// Graceful shutdown (keep your existing setup)
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