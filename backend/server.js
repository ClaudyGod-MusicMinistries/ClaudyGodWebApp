require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 10000;

// CORS whitelist from env
const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(u => u.replace(/\/$/, '').trim())
  : [];

// COrs-validator
console.log('🔑 Allowed CORS origins:', corsOrigins);

app.use(cors({
  origin: (incomingOrigin, cb) => {
    // allow no‑origin like curl/postman
    if (!incomingOrigin || corsOrigins.includes(incomingOrigin)) {
      cb(null, true);
    } else {
      cb(new Error(`Origin ${incomingOrigin} not allowed by CORS`));
    }
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Tester
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// MongoDB connection
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

// health & root
app.get('/', (_, res) =>
  res.json({ status: 'running', timestamp: new Date() })
);
app.get('/health', (_, res) =>
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date()
  })
);

// 404 and error handlers
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// keep‑alive pings (Render)
if (process.env.NODE_ENV === 'production') {
  setInterval(() => {
    https.get(`${process.env.KEEP_ALIVE_URL}/health`)
      .on('response', r => console.log(`Keep‑alive ping ${r.statusCode}`))
      .on('error', e => console.error('Keep‑alive failed:', e.message));
  }, 240000);
}

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT} (${process.env.NODE_ENV || 'dev'})`);
});


process.on('SIGINT', () => {
  console.log('🛑 Shutting down');
  mongoose.connection.close(() => {
    console.log('📦 MongoDB disconnected');
    process.exit(0);
  });
});
