import React from 'react';
import './Pharmacist.css';
import { Button } from "@material-ui/core";

const OrderList = ({ordersInfo, showFulfillOrder, setOrders}) => {
    // const ordersInfo = props.ordersInfo;
    

    return (
        <div>
            <h2>Orders</h2>
            <div className='order-list-container'>
                <table className="order-table">
                    <tr>
                        <th> Prescription ID </th>
                        <th> Patient Name </th>
                        <th> Requestee</th>
                        <th> Medication </th>
                        <th> Order </th>
                    </tr>
                    {ordersInfo
                    .map((order) => {
                        return (
                            <tr>
                                <td>{order.prescriptionID} </td>
                                <td>{order.patientName} </td>
                                <td>{order.requesteeName} </td>
                                <td>{order.medication} </td>
                                <Button type="button" variant= "contained" onClick={() => {showFulfillOrder(order)}}> Fulfill Order</Button>
                            </tr>
                        );
                    })}
                </table>
            </div>
        </div>
    );
};

export default OrderList;

