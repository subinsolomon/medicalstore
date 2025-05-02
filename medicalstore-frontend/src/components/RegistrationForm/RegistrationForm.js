import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegistrationForm.css'
import { setAuthFormType } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';


const RegistrationForm = () => {
  //  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user starts typing again
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const checkUsernameAvailability = async (username) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/check-username?username=${username}`);
      return response.data.available;
    } catch (error) {
      console.error('Error checking username:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Check username availability
      const isUsernameAvailable = await checkUsernameAvailability(formData.username);
      if (!isUsernameAvailable) {
        setErrors({ ...errors, username: 'Username already taken' });
        setIsSubmitting(false);
        return;
      }

      // Submit registration data
      const response = await axios.post('http://localhost:8080/api/register', {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName
      });

      if (response.data.success) {
        // Registration successful
        alert('Registration successful! Please log in.');
        //        navigate('/login'); // Redirect to login page
      } else {
        // Registration failed with a known reason
        setErrors({ general: response.data.message });
      }
    } catch (error) {
      // Handle different types of errors
      if (error.response && error.response.status === 409) {
        // Conflict - username or email exists
        const message = error.response.data.message;
        if (message.includes('Username')) {
          setErrors({ ...errors, username: 'Username already exists' });
        } else if (message.includes('Email')) {
          setErrors({ ...errors, email: 'Email already exists' });
        }
      } else {
        // Other errors
        setErrors({ general: 'Registration failed. Please try again later.' });
        console.error('Registration error:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const dispatch = useDispatch();
  const loginButtonHandler = ()=>{
    dispatch(setAuthFormType('login'));

  }

  return (
    <div className="card registration-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        {errors.general && (
          <div className="error-message">{errors.general}</div>
        )}

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <div className="error-message">{errors.username}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && (
            <div className="error-message">{errors.confirmPassword}</div>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Sign Up'}
        </button>
      </form>

      <div className="login-link">
        Already have an account? <button onClick={loginButtonHandler}
          style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>Log in</button>
      </div>
    </div>
  );
};

export default RegistrationForm;