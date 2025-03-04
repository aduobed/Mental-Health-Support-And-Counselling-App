import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ role }) => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    // Navigate to the SignUp page
    navigate('/signup');
  };

  return (
    <div className="auth-container">
      <h2>Welcome, {role === 'user' ? 'User' : 'Consultant'}!</h2>

      <form>
        <label htmlFor="lastname">Last Name:</label>
        <input type="text" id="lastname" name="lastname" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">Login</button>
      </form>

      <p className="signup-link">
        First time here? 
        <span onClick={handleSignUpClick} className="signup-text">Sign up</span>
      </p>
    </div>
  );
};

export default Login;
