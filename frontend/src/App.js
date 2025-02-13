import { useState } from 'react';
import Home from './components/Home';
import About from './components/About';
import ContactUs from './components/ContactUs';
import AppointmentBooking from './components/AppointmentBooking'; 
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState(''); 
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'contact':
        return <ContactUs />;
      case 'appointment':
        return <AppointmentBooking />; 
      default:
        return null; 
    }
  };

  return (
    <div className="App">
      {/* Header Section */}
      <header className="Main-header">
        {/* Three dots (vertical ellipsis) menu */}
        <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          &#x22EE; {/* Unicode for vertical ellipsis */}
        </div>

        <h1 className="App-title">Mental Health and Wellness App</h1>

        {/* Navigation Menu */}
        <nav className="Nav-menu">
          <button onClick={() => setCurrentPage('home')}>Home</button>
          <button onClick={() => setCurrentPage('about')}>About Us</button>
          <button onClick={() => setCurrentPage('contact')}>Contact Us</button>
        </nav>
      </header>

      {/* Display the Appointment Booking page when the menu is open */}
      {isMenuOpen && (
        <div className="menu-dropdown">
          <button onClick={() => setCurrentPage('appointment')}>Appointment Booking</button>
        </div>
      )}

      {/* Main Content */}
      <div className="App-content">
        {/* Display main content only when no page is selected */}
        {currentPage === '' && (
          <>
            <div className="background-image"></div> {/* Background Image */}
            <div className="overlay"></div> {/* Overlay for faded effect */}
            <div className="centered-text">
              <p>Welcome to the Mental Health and Wellness App. Explore tools and resources to support your mental well-being.</p>
            </div>
          </>
        )}
        
        {/* Dynamically render the page when selected */}
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
