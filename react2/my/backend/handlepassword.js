app.post('/reset-password', (req, res) => {
    const { email, newPassword } = req.body;
  
    // Update the user's password in your database
    if (users[email]) {
      users[email].password = newPassword; // Ensure proper hashing/saving in your actual implementation
      return res.json({ success: true });
    }
  
    return res.status(404).json({ success: false, message: 'User not found.' });
  });
  