import React, { useState } from 'react';
import './AppointmentBooking.css';

const AppointmentBooking = () => {
  const [isSignedUp, setIsSignedUp] = useState(false); // Track if the user has signed up

  // Handle the user sign-up status selection
  const handleSignUpStatusChange = (e) => {
    setIsSignedUp(e.target.value === 'yes');
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
        <form>
          <div className="form-group">
            {/* Name */}
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
          </div>

          <div className="form-group">
            {/* Contact Information */}
            <label htmlFor="contact">Contact Information (Phone or Email):</label>
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
            {/* Reason for Consultation */}
            <label htmlFor="reason">Reason for Consultation (Optional):</label>
            <textarea id="reason" name="reason" placeholder="Please provide details (optional)" />
          </div>

          <div className="form-group">
            {/* Confirmation Checkbox */}
            <label>
              <input type="checkbox" name="confirm" required /> I confirm that the details provided are accurate.
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
