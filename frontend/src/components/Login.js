import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ role }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUpClick = () => {
        navigate('/signup');
    };

    const handleLoginSubmit = async e => {
        e.preventDefault();

        const apiUrl =
            role === 'user'
                ? 'http://localhost:8000/api/user/login'
                : 'http://localhost:8000/api/doctor/login';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                navigate('/UserAppointments', { state: { userData: data } });
            } else {
                setError('Login unsuccessful. Please try again.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Login unsuccessful. Please try again.');
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

            {error && <p className="error-message">{error}</p>}

            <p className="signup-link">
                First time here?
                <span onClick={handleSignUpClick} className="signup-text">
                    <br />
                    Sign up
                </span>
            </p>
        </div>
    );
};

export default Login;
