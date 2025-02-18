import React from 'react';
import './AppointmentBooking.css';

const AppointmentBooking = () => {
  return (
    <div className="appointment-booking">
      <h2>Book an Appointment with a Consultant</h2>
      <form>
        {/* Name */}
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />

        {/* Contact Information */}
        <label htmlFor="contact">Contact Information (Phone or Email):</label>
        <input type="text" id="contact" name="contact" placeholder="Enter your phone or email" required />

        {/* Appointment Date */}
        <label htmlFor="date">Appointment Date:</label>
        <input type="date" id="date" name="date" required />

        {/* Appointment Time */}
        <label htmlFor="time">Appointment Time:</label>
        <input type="time" id="time" name="time" required />

        {/* Reason for Consultation */}
        <label htmlFor="reason">Reason for Consultation (Optional):</label>
        <textarea id="reason" name="reason" placeholder="Please provide details (optional)" />

        {/* Confirmation Checkbox */}
        <div>
          <label>
            <input type="checkbox" name="confirm" required /> I confirm that the details provided are accurate.
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
}

export default AppointmentBooking;
