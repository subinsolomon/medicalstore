import React, { useEffect, useState } from 'react';
import InventoryList from './components/Inventory/InventoryList.js';
import Login from './components/Login/Login.js';
import RegistrationForm from './components/RegistrationForm/RegistrationForm.js';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './redux/slices/authSlice';
import "./App.css";
import FileUpload from './components/FileUpload/FileUpload.js';


const Dashboard = () => {
    const [inventory, setInventory] = useState([]);
    //    const [showInventory,setShowInventory] = useState(false);
    //    const [isLoggedIn, setIsLoggedIn]  = useState(false);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const authFormType = useSelector((state) => state.auth.authFormType);


    const handleLogout = () => {
        dispatch(logout()); // Update global state
    };

    const fetchInventory = () => {
        fetch('http://localhost:8080/api/inventory')
            .then(response => response.json())
            .then(data => setInventory(data || []))
            .catch(error => {
                console.error('Error fetching inventory:', error);
                setInventory([]); // Ensure inventory is always an array
            });
        //            setShowInventory(true);
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    return (
        <div className="Dashboard">
            {!isLoggedIn && (authFormType == 'register' ? <RegistrationForm /> : <Login />)}
            {(isLoggedIn) && <><FileUpload refreshInventory={fetchInventory} />
                <InventoryList inventory={inventory} />
                <button className="logout-button" onClick={handleLogout}>Logout</button></>}
        </div>
    );
};

export default Dashboard;
