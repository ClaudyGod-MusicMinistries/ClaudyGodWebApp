require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 10000;

// Enhanced CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN 
    ? process.env.CORS_ORIGIN.split(',') 
    : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));

app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware to enforce JSON responses
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Database Connection
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => {
  console.error('❌ DB connection error:', err);
  process.exit(1);
});

// Import routes
const routes = {
  subscriber: require('./routes/SubscriberRoutes'),
  contact: require('./routes/ContactRoutes'),
  bookings: require('./routes/bookingsRoutes'),
  volunteer: require('./routes/volunteerRoutes'),
  paypal: require('./routes/paypalRoutes'),
  nigerianBank: require('./routes/nigerianBankTransferRoutes'),
  zellePayment: require('./routes/zellePaymentRoutes')
};

// Correct route mounting
app.use('/api/paypal', routes.paypal); // Fixed to match frontend path

// Mount other routes
app.use('/api/subscribers', routes.subscriber);
app.use('/api/contacts', routes.contact);
app.use('/api/bookings', routes.bookings);
app.use('/api/volunteers', routes.volunteer);
app.use('/api/nigerian-bank-transfer', routes.nigerianBank);
app.use('/api/zelle-payment', routes.zellePayment);

// Health Check
app.get('/health', (_, res) => res.json({ 
  status: 'up', 
  db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' 
}));

// Keep-alive endpoint for Render.com
app.get('/keep-alive', (_, res) => {
  res.send('Server awake');
});

// Start Server
const server = app.listen(PORT, () => 
  console.log(`🚀 Server running on port ${PORT}`)
);

// Ping self to prevent idle on Render
if (process.env.KEEP_ALIVE_URL) {
  setInterval(() => {
    console.log('Pinging self to keep alive...');
    fetch(process.env.KEEP_ALIVE_URL)
      .then(res => res.text())
      .then(console.log)
      .catch(console.error);
  }, 300000); // Every 5 minutes
}

// Graceful Shutdown
['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, () => {
    console.log(`\n${signal} received: Closing server`);
    server.close(() => {
      mongoose.connection.close(false, () => {
        console.log('MongoDB disconnected');
        process.exit(0);
      });
    });
  });
});