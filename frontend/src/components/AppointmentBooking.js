import React, { useState } from 'react';
import './AppointmentBooking.css';

const AppointmentBooking = () => {
  const [isSignedUp, setIsSignedUp] = useState(true); // Assuming they are signed up for the demo
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    date: '',
    time: '',
    reason: '',
  });

  const [bookingStatus, setBookingStatus] = useState(''); // Track the booking status

  // Handle form data changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate booking successful
    setBookingStatus('Successfully booked!'); // Show success message
    
    // Reset form data (Optional)
    setFormData({
      name: '',
      contact: '',
      date: '',
      time: '',
      reason: '',
    });
  };

  return (
    <div className="appointment-page">
      {/* Background image */}
      <div className="appointment-background"></div>

      {/* Foreground form content */}
      <div className="appointment-booking">
        <h2>Book an Appointment with a Consultant</h2>

        {/* Skip the sign-up question if already signed up */}
        {isSignedUp ? (
          <>
            {/* Show the booking success message after submission */}
            {bookingStatus && <p className="success-message">{bookingStatus}</p>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact">Contact Information (Phone or Email):</label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  placeholder="Enter your phone or email"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="date">Appointment Date:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="time">Appointment Time:</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="reason">Reason for Consultation (Optional):</label>
                <textarea
                  id="reason"
                  name="reason"
                  placeholder="Please provide details (optional)"
                  value={formData.reason}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>
                  <input type="checkbox" name="confirm" required /> I confirm that the details provided are accurate.
                </label>
              </div>

              <button type="submit">Book Appointment</button>
            </form>
          </>
        ) : (
          <p>
            Please <a href="/signup" className="sign-up-link">sign up</a> or{' '}
            <a href="/login" className="login-link">login</a> first before booking an appointment.
          </p>
        )}
      </div>
    </div>
  );
};

export default AppointmentBooking;