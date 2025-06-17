const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const subscriberRoutes = require('./routes/SubscriberRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 10000; // Use Render's required port

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
    "https://claudygod.org/"
  ],
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true
}));

app.options('*', cors());

// Add OPTIONS handler for preflight requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
})

app.use(express.json());

// MongoDB Connection
const dbUri = process.env.DB_URI || 'mongodb+srv://peter4tech:Ogba96@cluster0.khyjqap.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected Successfully"))
.catch(err => console.error("Database connection failed", err));

// Routes
app.use('/api/subscribers', subscriberRoutes);

app.get("/", (req, res) => {
  res.json({
    status: "running",
    message: "Server is running Live",
    timestamp: new Date()
  })
});

// Add health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// Keep Render awake
if (process.env.NODE_ENV === 'production') {
  setInterval(() => {
    console.log("Pinging server to prevent sleep...");
    fetch(`https://claudygodwebapp-1.onrender.com/health`)
      .then(res => console.log(`Ping status: ${res.status}`))
      .catch(err => console.error("Ping failed:", err));
  }, 240000); // Ping every 4 minutes
}

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`CORS Origins: ${process.env.CORS_ORIGIN}`);
});