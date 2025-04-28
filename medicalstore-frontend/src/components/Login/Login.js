import React, { useState } from 'react';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { login, setAuthFormType,setUserRole } from '../../redux/slices/authSlice';

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

        const credentials = { username, password };

        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });
            const data = await response.json(); // Handle backend response here

            if (response.ok) {
                setMessage(data.message);
                dispatch(login()); // Update global state
                dispatch(setUserRole(data.roles));
                console.log(data);
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            setMessage('An error occurred during login.');
        }
    };

    return (
        <div className="login-container">
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
                <button onClick={handleRegisterButton}
                    style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                    Don't have an account? Register
                </button>
                {message && <p>{message}</p>}
                {isLoggedIn && <p>You are logged in!</p>}
            </form>

        </div>
    );
};

export default Login;