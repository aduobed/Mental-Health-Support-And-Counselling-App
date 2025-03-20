import React from 'react';
import './Signup.css';

const Signup = () => {
  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form>
        <label htmlFor="firstname">First Name:</label>
        <input type="text" id="firstname" name="firstname" required />

        <label htmlFor="lastname">Last Name:</label>
        <input type="text" id="lastname" name="lastname" required />

        <label htmlFor="address">Username:</label>
        <input type="text" id="address" name="address" required />

        <label htmlFor="phone">Phone Number:</label>
        <input type="tel" id="phone" name="phone" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;

