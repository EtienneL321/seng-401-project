import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@material-ui/core";
import Select from "react-select";
import axios from 'axios';
import './Doctor.css';

const AssignMedication = (props) => {
    const [PatientValue, setPatientValue] = useState();
    const [MedicationtValue, setMedicationtValue] = useState();
    const [confirmState, setConfirmState] = useState(false);

    const changePatientRadio = (event) => {
        console.log(event.target.value);
        setPatientValue(event.target.value);
    };

    return (
        <div className = "assign-form">
            <h1>Assign Staff to Patient</h1>
            {confirmState ? 
            // (<Confirm confirmHandler={confirmAssignment} cancelHandler={cancelAssignment}>
            //     <h2>Confirm Assignment</h2>
            //     <p>Care Giver: {staffValue}</p>
            //     <p>Patient ID: {patientValue}</p>
            //     <p>Assigner ID: {props.self.staffID}, Assigner Name: {props.self.Name}</p>
            //     <br />
            // </Confirm>) 
            null : 
            (<form  >
                
                <div className="staff-selection">
                    <h2>Patient Selection</h2>
                    {props.patients.map((p) => <label><input name="staff" type="radio" className= "selector" onChange={changePatientRadio}/> {p.patientID + ", " + p.patientName} <br /></label>)}
                </div>
                <div className="patient-selection">
                    <h2>Medication Selection</h2>
                    <Select
                        options={props.medication.map(m => ({label: m.name, value: m.medicationID}))}
                        onChange={(e) => setMedicationtValue(e.value)}
                    />
                </div>
                <Button variant="contained" type="submit" className= "assign-button">Assign</Button>
            </form>)}
        </div>
    )
};

export default AssignMedication;