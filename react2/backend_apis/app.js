require('dotenv').config();  // To load environment variables
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import routes
const sendOtpRoute = require('./routes/sendOtp');
const verifyOtpRoute = require('./routes/verifyOtp');
const resetPasswordRoute = require('./routes/resetPassword');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', sendOtpRoute);
app.use('/auth', verifyOtpRoute);
app.use('/auth', resetPasswordRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
