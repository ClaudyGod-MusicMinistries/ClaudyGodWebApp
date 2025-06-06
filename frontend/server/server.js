require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


// Routes
const contactRoutes = require('./routes/ContactRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const subscriberRoutes = require('./routes/SubscribeRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/contacts', contactRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/subscribers', subscriberRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});