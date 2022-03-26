import React from 'react';
import './Pharmacist.css';

const FulfillOrder = ({order, inventoryInfo, handleFulfillOrder}) => {
    // const ordersInfo = props.ordersInfo;

    return (
        <div>
            <h3>Order to Fulfill</h3>
            <div className='fulfill-form-container'>
                <p>Prescription ID: {order.prescriptionID}</p>
                <p>Patient Name: {order.patientName}</p>
                <p>Medication: {order.medication}</p>
                <p>Amount: {order.amount}</p>
                <button onClick={() => {handleFulfillOrder(order)}} type="button" className='fulfill-btn'>
                    Fulfill Order
                </button>
            </div>
        </div>
    );
};

export default FulfillOrder;

