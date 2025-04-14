import React, { useEffect, useState } from 'react';
import InventoryList from './components/Inventory/InventoryList.js';
import FileUpload from './components/FileUpload';

const App = () => {
    const [inventory, setInventory] = useState([]);
    const [showInventory,setShowInventory] = useState(false);

    const fetchInventory = () => {
        fetch('http://localhost:8080/api/inventory')
            .then(response => response.json())
            .then(data => setInventory(data || []))
            .catch(error => {
                console.error('Error fetching inventory:', error);
                setInventory([]); // Ensure inventory is always an array
            });
            setShowInventory(true);
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    return (
        <div className="App">
            <FileUpload refreshInventory={fetchInventory} />
            {showInventory && <InventoryList inventory={inventory} />}
        </div>
    );
};

export default App;
