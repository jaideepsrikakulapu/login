// server.js or app.js (Your Express application file)

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5001; // or any port of your choice

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all origins

// Simulated in-memory user storage for demonstration purposes
let users = [
  { id: 1, email: 'user@example.com' } // Example user
];

// Update Profile Endpoint
app.put('/api/user/update', (req, res) => {
  const { id, email } = req.body;

  // Find user by id
  const user = users.find(user => user.id === id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Update user email
  user.email = email;

  // Return updated user information
  res.json({ message: 'Profile updated successfully', user });
});

// Send OTP Endpoint
app.post('/send-otp', (req, res) => {
  const { email } = req.body;

  // Here you would typically send the OTP to the user's email
  // For demonstration, we'll just log it and send a success response
  console.log(`Sending OTP to ${email}`);
  
  // Simulating OTP sending logic
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit OTP
  console.log(`Generated OTP: ${otp}`);

  res.json({ message: 'OTP sent successfully', otp }); // In a real application, don't return the OTP
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});