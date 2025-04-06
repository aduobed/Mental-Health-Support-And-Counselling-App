import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Resources from './components/Resources';
import AppointmentBooking from './components/AppointmentBooking';
import Login from './components/Login';
import Signup from './components/SignUp';
import './App.css';
import profileImage from './profile.jpg';
import logo from '/Users/saivenkatkumargunnapaneni/Documents/Venkat_Project/Mental-Health-Support-And-Counselling-App/frontend/src/Logo.png' // Import your logo here


function App() {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [roleSelection, setRoleSelection] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const userData = location.state?.userData;

    const handleRoleSelect = (role) => {
        setRoleSelection(role);
        navigate('/login');
        setIsProfileMenuOpen(false);
    };

    const handleProfileClick = (e) => {
        e.stopPropagation();
        setIsProfileMenuOpen(!isProfileMenuOpen);
        setRoleSelection(null);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="App" onClick={() => setIsProfileMenuOpen(false)}>
            <header className="Main-header">
                {/* Logo and Title Section */}
                <div className="logo-section">
                    <img src={logo} alt="App Logo" className="app-logo" />
                    <h1
                        className="App-title"
                        onClick={toggleSidebar}
                        style={{ cursor: 'pointer' }}
                    >
                        Mental Health and Wellness App
                    </h1>
                </div>

                {/* Profile Section on the Right */}
                <div className="profile-section" onClick={(e) => e.stopPropagation()}>
                    <div className="profile-icon" onClick={handleProfileClick}>
                        <img
                            src={profileImage}
                            alt="User Profile"
                            className="profile-img"
                        />
                    </div>

                    {/* Profile Dropdown */}
                    {isProfileMenuOpen && (
                        <div className="profile-dropdown">
                            <button onClick={() => handleRoleSelect('user')}>
                                {userData ? `Welcome, ${userData.data.username}` : 'User'}
                            </button>
                            <button
                                onClick={() => handleRoleSelect('consultant')}
                            >
                                Consultant
                            </button>
                        </div>
                    )}
                </div>
            </header>

            {/* Sidebar for Additional Options */}
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <button onClick={() => navigate('/home')}>Home</button>
                <button onClick={() => navigate('/appointment')}>Appointment Booking</button>
                <button onClick={() => navigate('/about')}>About Us</button>
                <button onClick={() => navigate('/resources')}>Resources</button>
            </div>

            {/* Main Content */}
            <div className={`App-content ${isSidebarOpen ? 'shifted' : ''}`}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route
                        path="/appointment"
                        element={<AppointmentBooking />}
                    />
                    <Route
                        path="/login"
                        element={<Login role={roleSelection} />}
                    />
                    <Route
                        path="/signup"
                        element={<Signup role={roleSelection} />}
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App;
