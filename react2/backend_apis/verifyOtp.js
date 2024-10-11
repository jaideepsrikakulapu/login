const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({ success: false, message: 'OTP expired' });
    }

    // OTP is valid; clear it from the user's data
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.json({ success: true, message: 'OTP verified' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error verifying OTP' });
  }
});

module.exports = router;
