// Load environment variables from .env file
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer'); // For sending emails
const crypto = require('crypto'); // For generating OTPs
const cors = require('cors');
const rateLimit = require('express-rate-limit'); // For rate limiting

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS

// Log incoming requests for debugging
app.use((req, res, next) => {
    console.log(`Received ${req.method} request for '${req.url}'`);
    console.log('Request body:', req.body);
    next();
});

// Rate limiting for sending OTP
const otpLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 requests per windowMs
    message: 'Too many OTP requests, please try again later.'
});

// In-memory user storage (Replace with your database)
const users = {
    "user@example.com": { password: "securepassword" } // Example user
};

// Configure email transport using environment variables
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
    },
});

// Generate and send OTP
app.post('/send-otp', otpLimiter, (req, res) => {
    const { email } = req.body;

    // Check if user exists
    if (!users[email]) {
        return res.status(400).send('User does not exist.');
    }

    // Generate a random OTP
    const otp = crypto.randomInt(100000, 999999).toString(); // Generates a 6-digit OTP

    // Set OTP and expiry time (1 minute)
    users[email].otp = otp;
    users[email].otpExpires = Date.now() + 60000; // 1 minute from now

    // Send OTP via email
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It is valid for 1 minute.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error); // Log the error
            return res.status(500).send('Error sending email: ' + error.toString());
        }
        console.log(`OTP sent to ${email}: ${info.response}`); // Log success
        res.status(200).send('OTP sent successfully to ' + email);
    });
});

// Verify OTP and reset password
app.post('/reset-password', (req, res) => {
    const { email, otp, newPassword } = req.body;

    // Check if OTP is valid and not expired
    if (users[email]?.otp === otp && Date.now() < users[email].otpExpires) {
        users[email].password = newPassword; // Update password
        delete users[email].otp; // Remove OTP after use
        delete users[email].otpExpires; // Clear expiry
        console.log(`Password reset for ${email}`); // Log password reset
        res.status(200).send('Password has been reset successfully.');
    } else {
        res.status(400).send('Invalid or expired OTP.');
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, (error) => {
    if (error) {
        console.error('Error starting server:', error);
        process.exit(1); // Exit the process on error
    }
    console.log(`Server is running on port ${PORT}`);
});
