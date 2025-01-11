import React, { useEffect, useState } from 'react';

const InventoryList = () => {
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/inventory')
            .then(response => response.json())
            .then(data => {
                console.log(data); // Debug: Check the fetched data
                setInventory(data);
            })
            .catch(error => console.error('Error fetching inventory:', error));
    }, []);

    return (
        <div>
            <h1>Inventory List</h1>
            <table>
                <thead>
                    <tr>
                        <th>S No</th>
                        <th>Product Name</th>
                        <th>Batch No</th>
                        <th>Expiry Date</th>
                        <th>Rate</th>
                        <th>MRP</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.length > 0 ? (
                        inventory.map(item => (
                            <tr key={item.sNo}>
                                <td>{item.sNo}</td>
                                <td>{item.productName}</td>
                                <td>{item.batchNo}</td>
                                <td>{item.expiryDate}</td>
                                <td>{item.rate}</td>
                                <td>{item.mrp}</td>
                                <td>{item.quantity}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No inventory items available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryList;
