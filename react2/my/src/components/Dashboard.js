import React, { useEffect, useState } from 'react';
import './Dashboard.css';

const Dashboard = ({ logout }) => {
  const [user, setUser] = useState(null);
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
    if (storedUser) {
      setUpdatedEmail(storedUser.email); // Set initial email in input
    }
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: user.id, email: updatedEmail }), // Assuming user has an id
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify({ ...user, email: updatedEmail }));
        setUser({ ...user, email: updatedEmail });
        setUpdateSuccess(data.message);
        setError('');
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setError(err.message);
      setUpdateSuccess('');
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome to the Dashboard</h2>
      {user ? (
        <div className="user-details">
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
      <div className="update-profile">
        <h3>Update Profile</h3>
        <input 
          type="email" 
          value={updatedEmail} 
          onChange={(e) => setUpdatedEmail(e.target.value)} 
          placeholder="Update your email" 
        />
        <button className="logout-button" onClick={handleUpdate}>
          Update
        </button>
        {updateSuccess && <p className="success-message">{updateSuccess}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
      <button className="logout-button" onClick={logout}>Sign Out</button>
    </div>
  );
};

export default Dashboard;
