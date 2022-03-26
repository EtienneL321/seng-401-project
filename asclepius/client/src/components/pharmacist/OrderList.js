import React from 'react';
import './Pharmacist.css';

const OrderList = ({ordersInfo, showFulfillOrder, setOrders}) => {
    // const ordersInfo = props.ordersInfo;
    

    return (
        <div>
            <h3>Orders</h3>
            <div className='order-list-container'>
                {ordersInfo
                .map((order) => {
                    return (
                        <div className='order-item' key={order.prescriptionID}>
                            <p>Prescription ID: {order.prescriptionID}, </p>
                            <p>Patient Name: {order.patientName}, </p>
                            <p>Requestee: {order.requesteeName}, </p>
                            <p>Medication: {order.medication}, </p>
                            <button type="button" onClick={() => {showFulfillOrder(order)}}> Fulfill Order</button>
                        </div>
                    );
                })}
                
            </div>
        </div>
    );
};

export default OrderList;

