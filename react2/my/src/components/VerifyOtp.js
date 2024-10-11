import React, { useState } from 'react';
import axios from '../axios';  // Ensure axios is configured properly

const VerifyOtp = ({ email, onSuccess }) => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/auth/verify-otp', { otp, email });
      if (response.data.success) {
        setMessage('OTP verified! You can now reset your password.');
        onSuccess();  // This function should navigate to ResetPassword component
      } else {
        setMessage('Invalid or expired OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setMessage('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <form onSubmit={handleVerifyOtp}>
        <input 
          type="text" 
          placeholder="Enter OTP" 
          value={otp} 
          onChange={(e) => setOtp(e.target.value)} 
          required 
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Verifying OTP...' : 'Verify OTP'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VerifyOtp;
