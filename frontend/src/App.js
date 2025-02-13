import { useState } from 'react';
import Home from './components/Home';
import About from './components/About';
import ContactUs from './components/ContactUs';
import AppointmentBooking from './components/AppointmentBooking';
import Login from './components/Login';
import Signup from './components/SignUp';
import './App.css';
import profileImage from './profile.jpg';

function App() {
  const [currentPage, setCurrentPage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const renderPage = () => {
    console.log("Current Page:", currentPage); // Debugging
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'contact':
        return <ContactUs />;
      case 'appointment':
        return <AppointmentBooking />;
      case 'login':
        return <Login />;
      case 'signup':
        return <Signup />;
      default:
        return null;
    }
  };

  return (
    <div className="App" onClick={() => setIsProfileMenuOpen(false)}> {/* Clicking anywhere else closes the dropdown */}
      <header className="Main-header">
        <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          &#x22EE;
        </div>

        <h1 className="App-title">Mental Health and Wellness App</h1>

        <nav className="Nav-menu">
          <button onClick={() => setCurrentPage('home')}>Home</button>
          <button onClick={() => setCurrentPage('about')}>About Us</button>
          <button onClick={() => setCurrentPage('contact')}>Contact Us</button>
        </nav>

        {/* User Profile Section */}
        <div className="profile-section" onClick={(e) => e.stopPropagation()}> 
          <div className="profile-icon" onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
            <img src={profileImage} alt="User Profile" className="profile-img" />
          </div>

          {/* Profile Dropdown */}
          {isProfileMenuOpen && (
            <div className="profile-dropdown">
              <button onClick={(e) => { e.stopPropagation(); setCurrentPage('login'); setIsProfileMenuOpen(false); }}>Login</button>
              <button onClick={(e) => { e.stopPropagation(); setCurrentPage('signup'); setIsProfileMenuOpen(false); }}>Signup</button>
            </div>
          )}
        </div>
      </header>

      {/* Dropdown for Appointment Booking */}
      {isMenuOpen && (
        <div className="menu-dropdown">
          <button onClick={() => setCurrentPage('appointment')}>Appointment Booking</button>
        </div>
      )}

      <div className="App-content">
        {currentPage === '' && (
          <>
            <div className="background-image"></div>
            <div className="overlay"></div>
            <div className="centered-text">
              <p>Welcome to the Mental Health and Wellness App. Explore tools and resources to support your mental well-being.</p>
            </div>
          </>
        )}

        {renderPage()}
      </div>
    </div>
  );
}

export default App;
