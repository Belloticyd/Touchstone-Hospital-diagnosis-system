
import axios from 'axios';

// Create an Axios instance with the base URL of the backend API
const API = axios.create({
  baseURL: 'http://localhost:7000/api/', 
});

// Attach token automatically to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');

  if (token) {
    // Using ['Authorization'] ensures compatibility with all Axios versions
    req.headers.Authorization = `Bearer ${token}`;
  }
  
  return req;
}, (error) => {
  return Promise.reject(error);
});

export default API;