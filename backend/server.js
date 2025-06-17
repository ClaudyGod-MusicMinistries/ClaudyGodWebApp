require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 10000;

// Enhanced CORS handling
const getOrigins = () => {
  const origins = process.env.CORS_ORIGIN 
    ? process.env.CORS_ORIGIN.split(',').map(u => {
        const url = u.trim();
        return url.endsWith('/') ? url.slice(0, -1) : url;
      })
    : [];
  
  console.log('🔑 Allowed CORS origins:', origins);
  return origins;
};

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = getOrigins();
    
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    // Check if origin is allowed
    const originAllowed = allowedOrigins.some(allowed => {
      return (
        origin === allowed ||
        origin === `${allowed}/` ||
        origin.replace(/\/$/, '') === allowed
      );
    });

    originAllowed
      ? callback(null, true)
      : callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`, {
    origin: req.headers.origin,
    ip: req.ip
  });
  next();
});

// MongoDB Connection
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Routes
const subscriberRoutes = require('./routes/SubscriberRoutes');
const contactRoutes = require('./routes/ContactRoutes');
const bookingsRoutes = require('./routes/bookingsRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');

app.use('/api/subscribers', subscriberRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/volunteers', volunteerRoutes);

// Health Check Endpoints
app.get('/', (_, res) => res.json({ 
  status: 'running', 
  timestamp: new Date(),
  environment: process.env.NODE_ENV || 'development'
}));

app.get('/health', (_, res) => res.json({
  status: 'ok',
  database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  timestamp: new Date(),
  corsOrigins: getOrigins()
}));

// Error Handling
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.stack}`);
  
  // Special handling for CORS errors
  if (err.message.includes('CORS')) {
    return res.status(403).json({ 
      error: 'Forbidden - Origin not allowed',
      allowedOrigins: getOrigins(),
      yourOrigin: req.headers.origin
    });
  }
  
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// Keep-alive for Render
if (process.env.NODE_ENV === 'production') {
  setInterval(() => {
    const url = `${process.env.KEEP_ALIVE_URL || app.get('url')}/health`;
    console.log(`Pinging keep-alive: ${url}`);
    
    https.get(url, res => {
      console.log(`Keep-alive status: ${res.statusCode}`);
    }).on('error', err => {
      console.error('Keep-alive error:', err.message);
    });
  }, 240000); // Every 4 minutes
}

// Server Start
const server = app.listen(PORT, () => {
  const address = server.address();
  const host = address.address === '::' ? 'localhost' : address.address;
  console.log(`🚀 Server running at http://${host}:${PORT} (${process.env.NODE_ENV || 'dev'})`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('🛑 Shutting down server...');
  mongoose.connection.close(false, () => {
    console.log('📦 MongoDB disconnected');
    server.close(() => {
      console.log('💤 Server stopped');
      process.exit(0);
    });
  });
});