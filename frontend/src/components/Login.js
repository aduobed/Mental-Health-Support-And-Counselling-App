import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ role }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUpClick = () => {
        // Navigate to the SignUp page
        navigate('/signup');
    };

    const handleLoginSubmit = async e => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            const response = await fetch(
                'http://localhost:8000/api/user/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                }
            );


            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);

                // Redirect to the dashboard or another page
                navigate('/home', { state: { userData: data } });
            } else {
                const errorData = await response.json();
                setError(errorData.detail || 'Login failed. Please try again.');
            }
        } catch (err) {
            console.error('Error during login:', err);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="auth-container">
            <h2>Welcome, {role === 'user' ? 'User' : 'Consultant'}!</h2>

            <form method="post">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    onChange={e => setUsername(e.target.value)}
                />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    onChange={e => setPassword(e.target.value)}
                />

                <button type="submit" onClick={handleLoginSubmit}>
                    Login
                </button>
            </form>

            <p className="signup-link">
                First time here?
                <span onClick={handleSignUpClick} className="signup-text">
                    Sign up
                </span>
            </p>
        </div>
    );
};

export default Login;
