import React from 'react';
import './Pharmacist.css';

const InventoryList = (props) => {
    const inventoryInfo = props.inventoryInfo;

    return (
        <div>
            <h2>Inventory</h2>
            <div className='order-list-container'>
                <table className="inventory-table">
                    <tr>
                        <th> ID </th>
                        <th> Name </th>
                        <th> Amount </th>
                    </tr>
                    {inventoryInfo
                    .map((inventoryItem) => {
                        return (
                                <tr key={inventoryItem.medicationID}>
                                    <td>{inventoryItem.medicationID} </td>
                                    <td>{inventoryItem.name} </td>
                                    <td>{inventoryItem.amount} </td>
                                </tr>
                        );
                    })}
                </table>
                
            </div>
        </div>
    );
};

export default InventoryList;

