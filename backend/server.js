require('dotenv').config();
const express       = require('express');
const mongoose      = require('mongoose');
const cors          = require('cors');
const helmet        = require('helmet');
const compression   = require('compression');
const morgan        = require('morgan');
const rateLimit     = require('express-rate-limit');
const fetch         = require('node-fetch');    // npm i node-fetch@2
                                          
const app   = express();
const PORT  = process.env.PORT || 10000;
const HOST  = process.env.KEEP_ALIVE_HOST || `http://localhost:${PORT}`;

// ─── MIDDLEWARE ────────────────────────────────────────────────────────────────
const corsOptions = {
  origin: process.env.CORS_ORIGIN 
    ? process.env.CORS_ORIGIN.split(',') 
    : '*',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max:      1000
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── DATABASE ──────────────────────────────────────────────────────────────────
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser:    true,
    useUnifiedTopology: true
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ DB connection error:', err);
    process.exit(1); // fatal
  });

// ─── ROUTES ────────────────────────────────────────────────────────────────────
const routes = {
  subscriber:   require('./routes/SubscriberRoutes'),
  contact:      require('./routes/ContactRoutes'),
  bookings:     require('./routes/bookingsRoutes'),
  volunteer:    require('./routes/volunteerRoutes'),
  nigerianBank: require('./routes/nigerianBankTransferRoutes'),
  zellePayment: require('./routes/zellePaymentRoutes')
};
app.use('/api/subscribers',       routes.subscriber);
app.use('/api/contacts',          routes.contact);
app.use('/api/bookings',          routes.bookings);
app.use('/api/volunteers',        routes.volunteer);
app.use('/api/nigerian-bank-transfer', routes.nigerianBank);
app.use('/api/zelle-payment',     routes.zellePayment);
app.get('/health', (_, res) =>
  res.json({
    status: 'up',
    db:     mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  })
);

app.get('/', (req, res) =>
  res.json({
    message: 'ClaudyGod API Service',
    status:  'running',
    version: '1.0.0'
  })
);
const server = app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
if (process.env.ENABLE_KEEP_ALIVE === 'true') {
  const intervalMs = Number(process.env.KEEP_ALIVE_INTERVAL_MS) || 5 * 60 * 1000; // 5m
  console.log(`🔄 Keep‑alive pinging ${HOST}/health every ${intervalMs/1000}s`);
  setInterval(async () => {
    try {
      const resp = await fetch(`${HOST}/health`);
      if (!resp.ok) {
        console.warn('⚠️ Keep‑alive ping failed:', resp.status);
      }
    } catch (err) {
      console.error('⚠️ Keep‑alive error:', err.message);
    }
  }, intervalMs);
}
const gracefulShutdown = (signal) => {
  console.log(`\n${signal} received: Shutting down gracefully`);
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('✅ MongoDB disconnected');
      process.exit(0);
    });
  });
};

['SIGINT','SIGTERM'].forEach(sig => process.on(sig, () => gracefulShutdown(sig)));

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  gracefulShutdown('uncaughtException');
});

process.on('unhandledRejection', (reason) => {
  console.error('❌ Unhandled Rejection:', reason);
  gracefulShutdown('unhandledRejection');
});
