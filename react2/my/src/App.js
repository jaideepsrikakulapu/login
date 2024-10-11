// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './components/ForgotPassword';
import './App.css'; // Optional CSS for styling
import './components/Dashboard.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('user'); // Remove user data on logout
    localStorage.removeItem('token'); // Remove token on logout
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login login={login} />} />
        <Route path="/signup" element={<Signup />} /> {/* Make sure this route is present */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<PrivateRoute isAuthenticated={isAuthenticated} component={Dashboard} logout={logout} />} />
      </Routes>
    </Router>
  );
};

export default App;
