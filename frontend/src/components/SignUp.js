import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = ({ role }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [first_name, setFirstname] = useState('');
    const [last_name, setLastname] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [phone_number, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLoginClick = () => {
        // Navigate to the Login page
        navigate('/login');
    };

    const handleSignupSubmit = async e => {
        e.preventDefault(); // Prevent the default form submission behavior

        const apiUrl =
            role === 'user'
                ? 'http://localhost:8000/api/user/signup'
                : 'http://localhost:8000/api/doctor/signup';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name,
                    last_name,
                    username,
                    phone_number,
                    email,
                    password,
                    ...(role === 'consultant' && { speciality }), // Add speciality if role is consultant
                }),
            });

            if (response.ok) {
                navigate('/login');
            } else {
                const errorData = await response.json();
                setError(
                    errorData.detail || 'Signup failed. Please try again.'
                );
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="auth-container">
            <h2>Signup</h2>
            <form method="post">
                <label htmlFor="firstname">First Name:</label>
                <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    required
                    onChange={e => setFirstname(e.target.value)}
                />

                <label htmlFor="lastname">Last Name:</label>
                <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    required
                    onChange={e => setLastname(e.target.value)}
                />

                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    onChange={e => setUsername(e.target.value)}
                />

                <label htmlFor="phone">Phone Number:</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    onChange={e => setPhone(e.target.value)}
                />

                {role === 'consultant' && (
                    <>
                        <label htmlFor="speciality">Speciality:</label>
                        <input
                            type="text"
                            id="speciality"
                            name="speciality"
                            required
                            onChange={e => setSpeciality(e.target.value)}
                        />
                    </>
                )}

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    onChange={e => setEmail(e.target.value)}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    onChange={e => setPassword(e.target.value)}
                />

                <button type="submit" onClick={handleSignupSubmit}>
                    Signup
                </button>
            </form>
            <p className="signup-link">
                Have an account already?
                <span onClick={handleLoginClick} className="signup-text">
                    <br></br>
                    Sign in
                </span>
            </p>
        </div>
    );
};

export default Signup;
