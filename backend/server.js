require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const https = require('https');

// Import routers
const subscriberRoutes = require('./routes/SubscriberRoutes');
const contactRoutes = require('./routes/ContactRoutes');
const bookingsRoutes = require('./routes/BookingsRoutes');
const volunteerRoutes = require('./routes/VolunteerRoutes');

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
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }

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
// // Handle preflight requests
// app.options('*', (req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   res.sendStatus(204);
// });
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

// Enhanced request logger
app.use((req, res, next) => {
  const { method, originalUrl, headers, ip } = req;
  console.log({
    ts: new Date().toISOString(),
    method,
    url: originalUrl,
    origin: headers.origin,
    ip
  });
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
app.use('/api/bookings', bookingsRoutes);
app.use('/api/volunteers', volunteerRoutes);

// Health check
app.get('/health', (_, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    memory: process.memoryUsage()
  });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Not Found', path: req.originalUrl
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.stack || err.message);
  const status = err.status || 500;
  let message = err.message || 'Internal Server Error';
  
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors).map(val => val.message).join(', ');
  }
  
  res.status(status).json({ error: message });
});

// Keep-alive ping (for Render)
if (process.env.NODE_ENV === 'production' && process.env.KEEP_ALIVE_URL) {
  const keepAlive = () => {
    const url = `${process.env.KEEP_ALIVE_URL}/health`;
    console.log(`Pinging: ${url}`);
    https.get(url, res => {
      console.log(`✅ Keep-alive status: ${res.statusCode}`);
    }).on('error', err => {
      console.error('❌ Keep-alive error:', err.message);
    });
    setTimeout(keepAlive, 240000); // Every 4 minutes
  };
  keepAlive();
}

// Graceful shutdown
const shutdown = async () => {
  console.log('🛑 Shutting down...');
  server.close(() => console.log('HTTP server closed'));
  await mongoose.connection.close(false);
  console.log('MongoDB disconnected');
  process.exit(0);
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});