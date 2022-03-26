import React from 'react';
import './Pharmacist.css';

const InventoryList = (props) => {
    const inventoryInfo = props.inventoryInfo;

    return (
        <div>
            <h3>Inventory</h3>
            <div className='order-list-container'>
                {inventoryInfo
                .map((inventoryItem) => {
                    return (
                        <div className='order-item' key={inventoryItem.medicationID}>
                            <p>ID: {inventoryItem.medicationID}, </p>
                            <p>Name: {inventoryItem.name}, </p>
                            <p>Amount: {inventoryItem.amount}, </p>
                        </div>
                    );
                })}
                
            </div>
        </div>
    );
};

export default InventoryList;

