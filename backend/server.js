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

// CORS Configuration
app.use(cors({
  origin: corsOrigins.length ? corsOrigins : [
    "http://localhost:3000",
    "https://claudygodwebapp-1.onrender.com"
  ],
  methods: ["GET", "POST"],
  credentials: true
}));

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
  res.send("Server is running Live");
});

// Add health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Keep Render awake
setInterval(() => {
  console.log("Pinging server to prevent sleep...");
  fetch(`https://claudygodwebapp-1.onrender.com/health`)
    .then(res => console.log(`Ping status: ${res.status}`))
    .catch(err => console.error("Ping failed:", err));
}, 240000); // Ping every 4 minutes

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});