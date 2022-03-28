import React from 'react';
import '../pharmacist/Pharmacist.css';
import { Button } from "@material-ui/core";

const MedicationPickupList = (props) => {
    // const ordersInfo = props.ordersInfo;

    return (
        <div>
            <h2>Prescriptions Ready to be Picked Up</h2>
            <div className='order-list-container'>
                <table className="order-table">
                    <tr>
                        <th> Prescription ID </th>
                        <th> Patient Name </th>
                        <th> Medication </th>
                        <th> Instructions </th>
                        <th> Amount </th>
                        <th>Pick Up</th>
                    </tr>
                    {props.prescriptions
                    .map((presc) => {
                        return (
                            <tr key={presc.prescriptionID}>
                                <td>{presc.prescriptionID} </td>
                                <td>{presc.patientName} </td>
                                <td>{presc.medication} </td>
                                <td>{presc.instructions} </td>
                                <td>{presc.amount} </td>
                                <td><Button type="button" variant= "contained" onClick={() => {props.showPickUpMedication(presc)}}> Pick Up Prescription</Button></td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        </div>
    );
};

export default MedicationPickupList;

