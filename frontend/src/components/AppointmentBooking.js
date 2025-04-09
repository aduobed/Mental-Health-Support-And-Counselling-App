import React, { useState, useEffect, useContext, use } from 'react';
import './AppointmentBooking.css';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';

const AppointmentBooking = () => {
    const [isSignedUp, setIsSignedUp] = useState(''); // Track if the user has signed up
    const [doctors, setDoctors] = useState([]); // Store the list of doctors
    const [selectedDoctor, setSelectedDoctor] = useState(''); // Track the selected doctor
    const { userData } = useContext(UserContext);
    const navigate = useNavigate();

    // Fetch the list of doctors from the API
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch(
                    'http://localhost:8000/api/doctor'
                ); // Replace with your API URL
                if (response.ok) {
                    const data = await response.json();
                    setDoctors(data || []); // Extract the array of doctors from the object
                } else {
                    console.error('Failed to fetch doctors');
                }
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, []);

    // Handle the user sign-up status selection
    const handleSignUpStatusChange = e => {
        setIsSignedUp(e.target.value === 'yes');
    };

    const handleFormSubmit = async e => {
        e.preventDefault(); // Prevent default form submission

        const formData = {
            // name: document.getElementById('name').value,
            // contact: document.getElementById('contact').value,
            booking_date: document.getElementById('date').value,
            booking_time: document.getElementById('time').value,
            doctor_id: selectedDoctor,
            booking_note: document.getElementById('note').value,
            user_id: userData?.id,
        };

        console.log('userData', userData);

        try {
            const response = await fetch('http://localhost:8000/api/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Appointment booked successfully!');
                navigate('/home'); // Redirect to the home page
            } else {
                const errorData = await response.json();
                alert(
                    `Failed to book appointment: ${
                        errorData.detail || 'Unknown error'
                    }`
                );
            }
        } catch (error) {
            console.error('Error booking appointment:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="appointment-booking">
            <h2>Book an Appointment with a Consultant</h2>

            {/* Ask if the user has signed up */}
            <div className="sign-up-check">
                <label>
                    Have you signed up?
                    <select onChange={handleSignUpStatusChange} required>
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </label>
            </div>

            {/* If the user has signed up, show the appointment booking form */}
            {isSignedUp ? (
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        {/* Name */}
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" required />
                    </div>

                    <div className="form-group">
                        {/* Contact Information */}
                        <label htmlFor="contact">
                            Contact Information (Phone or Email):
                        </label>
                        <input
                            type="text"
                            id="contact"
                            name="contact"
                            placeholder="Enter your phone or email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        {/* Appointment Date */}
                        <label htmlFor="date">Appointment Date:</label>
                        <input type="date" id="date" name="date" required />
                    </div>

                    <div className="form-group">
                        {/* Appointment Time */}
                        <label htmlFor="time">Appointment Time:</label>
                        <input type="time" id="time" name="time" required />
                    </div>

                    <div className="form-group">
                        {/* Select Doctor */}
                        <label htmlFor="doctor">Select Doctor:</label>
                        <select
                            id="doctor"
                            name="doctor"
                            value={selectedDoctor}
                            onChange={e => setSelectedDoctor(e.target.value)}
                            required
                        >
                            <option value="">Select a doctor</option>
                            {doctors.map(doctor => (
                                <option key={doctor.id} value={doctor.id}>
                                    {doctor.username} - {doctor.speciality}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        {/* Reason for Consultation */}
                        <label htmlFor="note">
                            Reason for Consultation (Optional):
                        </label>
                        <textarea
                            id="note"
                            name="note"
                            placeholder="Please provide details (optional)"
                        />
                    </div>

                    <div className="form-group">
                        {/* Confirmation Checkbox */}
                        <label>
                            <input type="checkbox" name="confirm" required /> I
                            confirm that the details provided are accurate.
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button type="submit">Book Appointment</button>
                </form>
            ) : (
                <p>
                    Please{' '}
                    <a href="/signup" className="sign-up-link">
                        sign up
                    </a>{' '}
                    or{' '}
                    <a href="/login" className="login-link">
                        login
                    </a>{' '}
                    first before booking an appointment.
                </p>
            )}
        </div>
    );
};

export default AppointmentBooking;
