import React, { useState, useRef, useEffect } from 'react';
import InventoryList from './components/Inventory/InventoryList.js';
import Login from './components/Login/Login.js';
import RegistrationForm from './components/RegistrationForm/RegistrationForm.js';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './redux/slices/authSlice';
import "./App.css";
import "./Dashboard.css";
import MyProfile from './components/Profile/MyProfile.js';
import { switchPage } from './redux/slices/pageSlice.js';

const Dashboard = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const currentPage = useSelector((state) => state.page.currentPage);
    const dispatch = useDispatch();
    const authFormType = useSelector((state) => state.auth.authFormType);
    const [menuOpen, setMenuOpen] = useState(false);

    const dropdownRef = useRef();

    const handleLogout = () => {
        dispatch(logout());
        setMenuOpen(false);
    };

    // ✅ Close dropdown if click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="Dashboard">
            {!isLoggedIn ? (
                authFormType === 'register' ? <RegistrationForm /> : <Login />
            ) : (
                <>
                    <div className="profile-container" ref={dropdownRef}>
                        <div className="profile-icon" onClick={() => setMenuOpen(!menuOpen)}>
                            👤
                        </div>
                        {menuOpen && (
                            <div className="profile-dropdown">
                                <div className="dropdown-item" onClick={() => { dispatch(switchPage('myProfile')); setMenuOpen(false); }}>My Profile</div>
                                <div className="dropdown-item" onClick={handleLogout}>Logout</div>
                            </div>
                        )}
                    </div>
                    {currentPage === 'dashboard' && <InventoryList />}
                    {currentPage === 'myProfile' && <MyProfile />}
                </>
            )}
        </div>
    );
};

export default Dashboard;
