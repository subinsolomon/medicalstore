import React from 'react';
import './InventoryList.css';

const InventoryList = ({ inventory = [] }) => {
    return (
        <div>
            <h1>Inventory List</h1>
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>S No</th>
                        <th>Product Name</th>
                        <th>Comp</th>
                        <th>Qty</th>
                        <th>Free</th>
                        <th>Batch No</th>
                        <th>Expiry Date</th>
                        <th>Pack</th>
                        <th>P.T.R</th>
                        <th>Rate</th>
                        <th>DISC%</th>
                        <th>M.R.P</th>
                        <th>Amount</th>
                        <th>I</th>
                        <th>C</th>
                        <th>S</th>
                        <th>GST Amt</th>
                        <th>HSN Code</th>
                        <th>P.Rate Disc</th>
                        <th>MRP Disc</th>
                        <th>Exp.Date</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.length > 0 ? (
                        inventory.map(item => (
                            <tr key={item.sNo}>
                                <td>{item.sNo}</td>
                                <td>{item.productName}</td>
                                <td>{item.comp}</td>
                                <td>{item.qty}</td>
                                <td>{item.free}</td>
                                <td>{item.batchNo}</td>
                                <td>{item.expiryDate}</td>
                                <td>{item.pack}</td>
                                <td>{item.ptr}</td>
                                <td>{item.rate}</td>
                                <td>{item.discPercent}</td>
                                <td>{item.mrp}</td>
                                <td>{item.amount}</td>
                                <td>{item.i}</td>
                                <td>{item.c}</td>
                                <td>{item.s}</td>
                                <td>{item.gstAmt}</td>
                                <td>{item.hsnCode}</td>
                                <td>{item.pRateDisc}</td>
                                <td>{item.mrpDisc}</td>
                                <td>{item.expDate}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="21">No inventory items available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryList;
