import React from 'react';

const InventoryList = ({ inventory = [] }) => {
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
