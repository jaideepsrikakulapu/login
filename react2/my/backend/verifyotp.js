app.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;
  
    // Check if the OTP matches
    if (users[email] && users[email].otp === otp) {
      // Clear the OTP after successful verification
      delete users[email].otp;
      return res.json({ success: true });
    }
  
    return res.status(400).json({ success: false, message: 'Invalid OTP.' });
  });
  