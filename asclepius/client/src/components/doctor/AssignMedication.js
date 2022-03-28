import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@material-ui/core";
import Select from "react-select";
import axios from 'axios';
import Input from "@material-ui/core/Input";
import './Doctor.css';
import Confirm from '../UI/Messages/Confirm';


const AssignMedication = (props) => {
    const [patientValue, setPatientValue] = useState(null);
    const [medicationtValue, setMedicationtValue] = useState(null);
    const [medicationName, setMedicationName] = useState("");
    const [amount, setAmount] = useState(null);
    const [instructions, setInstructions] = useState("");
    const [confirmState, setConfirmState] = useState(false);
    

    const changePatientRadio = (event) => {
        console.log(event.target.value);
        setPatientValue(event.target.value);
    };

    const addPrescriptionHandler = (e) => {
        e.preventDefault();
        setConfirmState(true);
    };

    const confirmAddPrescription= () => {
        let date = new Date();
        const currTime = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()+ " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        let prescData = {
            patientID: patientValue,
            medicationID: medicationtValue,
            amount: amount,
            instructions : instructions,
            requesteeID: props.staffInfo.staffID,
            time: currTime,
        }
        props.addPrescription(prescData);
        setConfirmState(false);
    }

    const cancelAddPrescription = () => {
        setConfirmState(false);
    }

    return (
        <div className = "assign-form">
            <h1>Order Patient Medication</h1>
            {confirmState ? 
            (<Confirm confirmHandler={confirmAddPrescription} cancelHandler={cancelAddPrescription}>
                <h2>Confirm Prescription</h2>
                <p>Patient ID: {patientValue}</p>
                <p>Requestee: {props.staffInfo.staffID}</p>
                <p>Medication: {medicationName}</p>
                <p>Amount {amount}</p>
                <p>Instructions: {instructions}</p>
                <br />
            </Confirm>) 
            : 
            (<form onSubmit={addPrescriptionHandler}>
                <div className="staff-selection">
                    <h2>Patient Selection</h2>
                    {props.patients.map((p) => <label><input name="patient" type="radio" className= "selector" value={p.patientID} onChange={ changePatientRadio}/> {p.patientID + ", " + p.patientName} <br /></label>)}
                </div>
                <div className="patient-selection">
                    <h2>Medication Selection</h2>
                    <Select
                        options={props.medication.map(m => ({label: m.name, value: m.medicationID}))}
                        onChange={(e) => {setMedicationtValue(e.value); setMedicationName(e.label)}}
                    />
                    <Input
                        title='Order Amount'
                        placeholder="Enter amount"
                        value={amount}
                        type="number"
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <br/> <br/>
                    <Input
                        title='Instructions'
                        placeholder="Enter instructions"
                        value={instructions}
                        type="text"
                        onChange={(e) => setInstructions(e.target.value)}
                    />
                    <br/> <br/>
                    <Button variant="contained" type="submit" className= "assign-button">Order Prescription</Button>
                </div>
                
            </form>)}
        </div>
    )
};

export default AssignMedication;