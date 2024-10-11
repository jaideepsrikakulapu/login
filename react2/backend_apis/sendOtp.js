const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Assuming you have a User model
const nodemailer = require('nodemailer');
const crypto = require('crypto');  // For generating OTP
const OTP_EXPIRY_TIME = 10 * 60 * 1000; // 10 minutes

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,  // Your email
    pass: process.env.EMAIL_PASSWORD,  // Your email password
  },
});

router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Generate OTP and save to user
    const otp = crypto.randomInt(100000, 999999); // Generate 6-digit OTP
    user.otp = otp;
    user.otpExpiry = Date.now() + OTP_EXPIRY_TIME;
    await user.save();

    // Send OTP via email
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'OTP sent to your email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error sending OTP' });
  }
});

module.exports = router;
