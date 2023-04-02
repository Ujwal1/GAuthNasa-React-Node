import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send login request to API route
      const response = await axios.post('/api/auth/login', { email, password });
      const { token } = response.data;

      // Store JWT token in local storage
      localStorage.setItem('token', token);

      // Redirect to home page
      window.location = '/';
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email</label>
      <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      <label>Password</label>
      <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
