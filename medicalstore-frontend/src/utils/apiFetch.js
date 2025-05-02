// src/utils/apiFetch.js

// Read the API URL from environment variable
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

/**
 * Custom fetch wrapper with predefined API URL
 * @param {string} endpoint - The API endpoint (without the base URL)
 * @param {object} options - Fetch options
 * @returns {Promise} - Fetch promise
 */
const apiFetch = (endpoint, options = {}) => {
  // Set default options
  const defaultOptions = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Combine default options with provided options
  const fetchOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...(options.headers || {}),
    },
  };

  // Make the request with the API URL + endpoint
  return fetch(`${API_URL}${endpoint}`, fetchOptions);
};

export default apiFetch;