import React, { useState, useEffect } from 'react';
import './UserAppointments.css';
import { FaCalendarAlt, FaClock, FaBullseye, FaQuoteLeft } from 'react-icons/fa';

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [mood, setMood] = useState('');
  const [goalProgress, setGoalProgress] = useState(0);
  const [stats, setStats] = useState({ totalAppointments: 0, upcoming: 0, past: 0 });

  const moodOptions = ["Happy", "Anxious", "Stressed", "Calm", "Sad"];

  // Fetch data from API when the component mounts
  useEffect(() => {
    // Fetch appointments
    fetch('/api/appointments')
      .then(response => response.json())
      .then(data => setAppointments(data))
      .catch(error => console.error('Error fetching appointments:', error));

    // Fetch mood
    fetch('/api/mood')
      .then(response => response.json())
      .then(data => setMood(data.mood))
      .catch(error => console.error('Error fetching mood:', error));

    // Fetch goal progress
    fetch('/api/goal-progress')
      .then(response => response.json())
      .then(data => setGoalProgress(data.goalProgress))
      .catch(error => console.error('Error fetching goal progress:', error));

    // Fetch stats
    fetch('/api/stats')
      .then(response => response.json())
      .then(data => setStats(data))
      .catch(error => console.error('Error fetching stats:', error));
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div className="appointments-container">
      <div className="grid-layout">
        {/* Section 1: Welcome Header */}
        <section className="section welcome-header">
          <h1>Welcome Back!</h1>
          <p>Your mental wellness journey continues...</p>
        </section>

        {/* Section 2: Mood Tracker */}
        <section className="section mood-tracker">
          <h3>Your Mood Today: <span>{mood}</span></h3>
          <select value={mood} onChange={(e) => setMood(e.target.value)}>
            {moodOptions.map((moodOption, index) => (
              <option key={index} value={moodOption}>{moodOption}</option>
            ))}
          </select>
        </section>

        {/* Section 3: Upcoming Appointments */}
        <section className="section appointments">
          <h2>Upcoming Appointments</h2>
          <div className="appointment-list">
            {appointments.filter((appt) => appt.status === 'upcoming').map((appt) => (
              <div key={appt.id} className="appointment-card">
                <h3>{appt.title}</h3>
                <p><FaCalendarAlt /> <strong>Date:</strong> {appt.date}</p>
                <p><FaClock /> <strong>Time:</strong> {appt.time}</p>
                <div className="actions">
                  <button className="button reschedule">Reschedule</button>
                  <button className="button cancel">Cancel</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Goal Progress */}
        <section className="section goal-progress">
          <h3>Your Progress</h3>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${goalProgress}%` }}></div>
          </div>
          <p>{goalProgress}% of your mental wellness goals achieved</p>
        </section>

        {/* Section 5: Inspirational Quote */}
        <section className="section inspirational-quote">
          <h3><FaQuoteLeft /> Inspirational Quote</h3>
          <p>"The only way out is through." – Robert Frost</p>
        </section>

        {/* Section 6: Stats Summary */}
        <section className="section summary-stats">
          <div className="stat-card">
            <h3>Total Appointments</h3>
            <p>{stats.totalAppointments}</p>
          </div>
          <div className="stat-card">
            <h3>Upcoming</h3>
            <p>{stats.upcoming}</p>
          </div>
          <div className="stat-card">
            <h3>Past</h3>
            <p>{stats.past}</p>
          </div>
        </section>

        {/* Section 7: Empty Space / Future Section */}
        <section className="section empty-space">
          {/* You can use this for any other content or leave it empty */}
        </section>
      </div>
    </div>
  );
};

export default UserAppointments;
