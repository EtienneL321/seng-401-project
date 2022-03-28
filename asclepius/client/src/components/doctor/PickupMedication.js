import React from 'react';
import '../pharmacist/Pharmacist.css';

const FulfillOrder = ({presc, handlePickupOrder}) => {

    return (
        <div>
            <h3>Pick up a Prescription</h3>
            <div className='fulfill-form-container'>
                <p>Prescription ID: {presc.prescriptionID}</p>
                <p>Patient Name: {presc.patientName}</p>
                <p>Medication: {presc.medication}</p>
                <p>Amount: {presc.amount}</p>
                <p>Instructions: {presc.instructions}</p>
                <button onClick={() => {handlePickupOrder(presc)}} type="button" className='fulfill-btn'>
                    Pick Up
                </button>
            </div>
        </div>
    );
};

export default FulfillOrder;

