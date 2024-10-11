// src/components/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginsignup.css'; // Ensure this file exists

const Login = ({ login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser) {
      setError('User does not exist. Please sign up.');
      return;
    }

    if (email === storedUser.email && password === storedUser.password) {
      localStorage.setItem('token', 'user-authenticated-token'); // Optionally store a token
      setError('');
      alert('Login successful!');
      login(); // Call login to update authenticated state
      navigate('/dashboard');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p>
        <a href="/signup">Don't have an account? Sign Up</a> {/* Ensure this link is present */}
      </p>
      <p>
        <a href="/forgot-password">Forgot Password?</a>
      </p>
    </div>
  );
};

export default Login;
