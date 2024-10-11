import React, { useState } from 'react';
import axios from '../axios';

const ResetPassword = ({ email, otp }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setMessage("Passwords do not match!");
    }
    setLoading(true);
    try {
      const response = await axios.post('/auth/reset-password', { email, otp, password });
      if (response.data.success) {
        setMessage('Password reset successfully! You can now log in.');
        // Optionally redirect to login page
      } else {
        setMessage('Error resetting password. Please try again.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <input 
          type="password" 
          placeholder="New Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Confirm Password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          required 
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Resetting Password...' : 'Reset Password'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
