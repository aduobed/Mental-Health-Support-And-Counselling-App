import React from 'react';
import './Login.css';



const Login = () => {
  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form>
        <label htmlFor="lastname">Last Name:</label>
        <input type="text" id="lastname" name="lastname" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
