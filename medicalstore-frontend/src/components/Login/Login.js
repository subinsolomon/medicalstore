import React, { useState } from 'react';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { login, setAuthFormType, setUserRole } from '../../redux/slices/authSlice';
import apiFetch from '../../utils/apiFetch';
import { switchPage } from '../../redux/slices/pageSlice';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const handleRegisterButton = () => {
        dispatch(setAuthFormType('register'));
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        try {
            const response = await apiFetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData,
                credentials: 'include', // Important: allows session cookie to be saved
            });

            if (response.ok) {
                // Optionally fetch user details after login
                const profileRes = await apiFetch('/profile', {
                    credentials: 'include',
                });
                const profileData = await profileRes.json();

                dispatch(login());
                dispatch(setUserRole(profileData.roles || []));
                setMessage('Login successful');
                dispatch(switchPage('dashboard'))
            } else {
                setMessage('Invalid username or password');
            }
        } catch (error) {
            console.error('Login error:', error);
            setMessage('An error occurred during login.');
        }
    };

    return (
        <div className="login-container card">
            <form className="login-form" onSubmit={handleLogin}>
                <h1>Login</h1>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                <button
                    type="button"
                    onClick={handleRegisterButton}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'blue',
                        textDecoration: 'underline',
                        cursor: 'pointer'
                    }}
                >
                    Don't have an account? Register
                </button>
                {message && <p>{message}</p>}
                {isLoggedIn && <p>You are logged in!</p>}
            </form>
        </div>
    );
};

export default Login;
