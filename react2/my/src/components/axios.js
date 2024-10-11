import axios from 'axios';

// Example base URL, update it to match your server
const instance = axios.create({
  baseURL: 'http://your-backend-server.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;
