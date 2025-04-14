import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for React 18
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Create the root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
);