import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Resources from './components/Resources';  
import AppointmentBooking from './components/AppointmentBooking';
import Login from './components/Login';
import Signup from './components/SignUp';
import './App.css';
import profileImage from './profile.jpg';

function App() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [roleSelection, setRoleSelection] = useState(null);
  const navigate = useNavigate();  // Use useNavigate for programmatic navigation

  const handleRoleSelect = (role) => {
    setRoleSelection(role);
    navigate('/login');  // Use navigate to go to login page after selecting role
    setIsProfileMenuOpen(false);
  };

  const handleProfileClick = (e) => {
    e.stopPropagation();
    setIsProfileMenuOpen(!isProfileMenuOpen);
    setRoleSelection(null);
  };

  return (
    <div className="App" onClick={() => setIsProfileMenuOpen(false)}>
      <header className="Main-header">
        <h1 className="App-title" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Mental Health and Wellness App</h1>

        <nav className="Nav-menu">
          <button onClick={() => navigate('/appointment')}>Appointment Booking</button>
          <button onClick={() => navigate('/about')}>About Us</button>
          <button onClick={() => navigate('/resources')}>Resources</button>  
        </nav>

        {/* User Profile Section */}
        <div className="profile-section" onClick={(e) => e.stopPropagation()}> 
          <div className="profile-icon" onClick={handleProfileClick}>
            <img src={profileImage} alt="User Profile" className="profile-img" />
          </div>

          {/* Profile Dropdown */}
          {isProfileMenuOpen && (
            <div className="profile-dropdown">
              <button onClick={() => handleRoleSelect('user')}>User</button>
              <button onClick={() => handleRoleSelect('consultant')}>Consultant</button>
            </div>
          )}
        </div>
      </header>

      <div className="App-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/appointment" element={<AppointmentBooking />} />
          <Route path="/login" element={<Login role={roleSelection} />} />
          <Route path="/signup" element={<Signup role={roleSelection} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
