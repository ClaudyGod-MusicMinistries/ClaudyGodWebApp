const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const subscriberRoutes = require('./routes/SubscriberRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Creating the communication between 
app.use(cors({
  origin: [
    process.env.CORS_ORIGIN,
     "https://claudygodwebapp-1.onrender.com"
  ],
  credentials:true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology:true
})
.then(() => console.log("MongoDB Connected Successfully"))
.catch(err => console.error("Database connection failed", err));

// Routes
app.use('/api/subscribers', subscriberRoutes);

app.get("/", (req, res) => {
  res.send("Server is running Live")
})

app.listen(port,() => {
  console.log(`Server started on port' ${port}`)
})