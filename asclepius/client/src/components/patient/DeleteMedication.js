import React, { useState, useEffect, useRef } from 'react';
import './Patient.css';
import { Button } from "@material-ui/core";

const DeleteMedication = (props) => {
    const [prescriptionValue, setPrescriptionValue] = useState();

    const deleteMedicationHandler = (e) => {
        e.preventDefault();
        const prescriptionID = {
            ID: parseInt(prescriptionValue)
        }
        props.deleteMedication(prescriptionID);
    };

    const changePrescriptionRadio = (event) => {
        console.log(event.target.value);
        setPrescriptionValue(event.target.value);
    };
    
    return (
        <div className="diagnosis">
            <form onSubmit={deleteMedicationHandler}>
                <div className="staff-selection">
                    <h2>Medication Selection</h2>
                    {props.prescriptions.map((p) => <label><input name="prescription" type="radio" className= "selector" key={p.prescriptionID} value={p.prescriptionID} onChange={changePrescriptionRadio}/> {p.prescriptionID + ", " + props.medication.map((m) => m.medicationID === p.medicationID ? m.name.replace(',', '') : null)} <br /></label>)}
                </div>
                
                <Button variant="contained" type="submit" className="assign-button">Delete Medication</Button>
            </form>
        </div>
    )
};

export default DeleteMedication;