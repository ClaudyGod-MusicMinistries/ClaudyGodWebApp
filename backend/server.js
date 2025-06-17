const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const https = require('https'); // Added for keep-alive requests

dotenv.config();

const app = express();
const port = process.env.PORT || 10000;

// Parse CORS_ORIGIN into array
const corsOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
  : [];
console.log('Allowed CORS origins:', corsOrigins);

// CORS Configuration
app.use(cors({
  origin: corsOrigins.length ? corsOrigins : [
    "http://localhost:3000",
    "https://claudygodwebapp-1.onrender.com",
    "https://claudygod.org"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For form data

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// MongoDB Connection
const dbUri = process.env.DB_URI || 'mongodb+srv://peter4tech:Ogba96@cluster0.khyjqap.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected Successfully"))
.catch(err => {
  console.error("Database connection failed", err);
  process.exit(1); // Exit on DB connection failure
});


const subscriberRoutes = require('./routes/SubscriberRoutes');


app.use('/api/subscribers', subscriberRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    status: "running",
    message: "Server is running Live",
    timestamp: new Date()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.status(200).json({ 
    status: 'ok', 
    database: dbStatus,
    timestamp: new Date() 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Keep Render awake (production only)
if (process.env.NODE_ENV === 'production') {
  setInterval(() => {
    console.log("Pinging server to prevent sleep...");
    
    https.get('https://claudygodwebapp-1.onrender.com/health', (res) => {
      console.log(`Keep-alive ping status: ${res.statusCode}`);
    }).on('error', (err) => {
      console.error("Keep-alive ping failed:", err.message);
    });
  }, 240000); // Every 4 minutes
}

// Start server
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close(() => {
    mongoose.connection.close();
    console.log('Server and DB connection closed');
    process.exit(0);
  });
});