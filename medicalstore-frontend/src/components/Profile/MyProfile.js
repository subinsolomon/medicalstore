// components/Profile/MyProfile.js

import React, { useEffect, useState } from 'react';
import './MyProfile.css';
import apiFetch from '../../utils/apiFetch';

const MyProfile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        apiFetch('/user/profile', {
            method: 'GET',
            credentials: 'include', // if using cookies/sessions
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`, // if using JWT
            },
        })
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch profile');
                return response.json();
            })
            .then(data => setUser(data))
            .catch(err => setError(err.message));
    }, []);

    if (error) return <div className="profile-error">{error}</div>;

    return (
        <div className="profile-card">
            <h2>My Profile</h2>
            {!user ? (
                <p>Loading...</p>
            ) : (
                <div className="profile-details">
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Full Name:</strong> {user.fullName}</p>
                    <p><strong>Roles:</strong> {user.roles?.join(', ')}</p>
                </div>
            )}
        </div>
    );
};

export default MyProfile;
