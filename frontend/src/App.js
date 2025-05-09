import { useState, createContext, useContext, useEffect } from 'react';
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
import logo from './Logo.png';
import UserAppointments from './components/UserAppointments';
import ChatbotButton from './components/ChatbotButton';

// Create a UserContext
export const UserContext = createContext(null);

function App() {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [roleSelection, setRoleSelection] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [userData, setUserData] = useState(location.state?.userData || null);

    useEffect(() => {
        if (location.state?.userData) {
            setUserData(location.state.userData);
        }
    }, [location.state]);

    const handleRoleSelect = role => {
        setRoleSelection(role);
        // navigate('/login');
        setIsProfileMenuOpen(false);
    };

    const handleProfileClick = e => {
        e.stopPropagation();
        setIsProfileMenuOpen(!isProfileMenuOpen);
        setRoleSelection(null);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSignOut = () => {
        setUserData(null); // Clear userData
        navigate('/login'); // Redirect to the login page
    };

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
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
                    <div
                        className="profile-section"
                        onClick={e => e.stopPropagation()}
                    >
                        <div
                            className="profile-icon"
                            onClick={handleProfileClick}
                        >
                            <img
                                src={profileImage}
                                alt="User Profile"
                                className="profile-img"
                            />
                        </div>

                        {/* Profile Dropdown */}
                        {isProfileMenuOpen && (
                            <div className="profile-dropdown">
                                <button
                                    onClick={() => {
                                        if (
                                            location.pathname !== '/login' &&
                                            userData !== null &&
                                            userData.username
                                        ) {
                                            navigate('/UserAppointments');
                                        } else {
                                            handleRoleSelect('user');
                                        }
                                    }}
                                >
                                    {!userData
                                        ? 'User'
                                        : `Welcome, ${userData.username}`}
                                </button>
                                {!userData && (
                                    <button
                                        onClick={() =>
                                            handleRoleSelect('consultant')
                                        }
                                    >
                                        Consultant
                                    </button>
                                )}
                                {userData && (
                                    <button onClick={handleSignOut}>
                                        Sign out
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </header>

                {/* Sidebar for Additional Options */}
                <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                    <button onClick={() => navigate('/home')}>Home</button>
                    <button onClick={() => navigate('/appointment')}>
                        Appointment Booking
                    </button>
                    <button onClick={() => navigate('/about')}>About Us</button>
                    <button onClick={() => navigate('/resources')}>
                        Resources
                    </button>
                </div>

                {/* Main Content */}
                <div
                    className={`App-content ${isSidebarOpen ? 'shifted' : ''}`}
                >
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/resources" element={<Resources />} />
                        <Route
                            path="/UserAppointments"
                            element={<UserAppointments />}
                        />
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

                    <ChatbotButton />
                </div>
            </div>
        </UserContext.Provider>
    );
}

export default App;
