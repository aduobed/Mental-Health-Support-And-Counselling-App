import React from 'react';
import './AppointmentBooking.css'; 
const AppointmentBooking = () => {
  return (
    <div className="appointment-booking">
      <h2>Book an Appointment</h2>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
        
        <label htmlFor="date">Appointment Date:</label>
        <input type="date" id="date" name="date" required />
        
        <label htmlFor="time">Appointment Time:</label>
        <input type="time" id="time" name="time" required />

        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
}

export default AppointmentBooking;
