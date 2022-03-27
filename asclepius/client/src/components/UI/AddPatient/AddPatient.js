import React from "react";
import { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import Confirm from "../Messages/Confirm";
import '../CommonUI.css';

const AddPatient = (props) => {

    const [ confirmState, setConfirmState ] = useState(false);
    const [enteredName, setEnteredName] = useState('');
    const [enteredAddress, setEnteredAddress] = useState(null);
    const [enteredPhone, setEnteredPhone] = useState('');

    const nameChangeHandler = (e) => {
        setEnteredName(e.target.value);
    };

    const addressChangeHandler = (e) => {
        setEnteredAddress(e.target.value);
    };

    const phoneChangeHandler = (e) => {
        setEnteredPhone(e.target.value);
    };

    const addPatientHandler = (e) => {
        e.preventDefault();
        setConfirmState(true);
    };

    const confirmAddPatient = () => {
        let newPatient = {
            name: enteredName,
            address: enteredAddress,
            phone: enteredPhone
        }
        props.addPatient(newPatient);
        setConfirmState(false);
    }

    const cancelAddPatient = () => {
        setConfirmState(false);
    }

    return (
        <div className="add-patient">
            <h2>Add Patient</h2>
            {confirmState ? 
            <Confirm confirmHandler={confirmAddPatient} cancelHandler={cancelAddPatient}>
                <h2>Confirm Add Patient</h2>
                <p>Patient Name: {enteredName}</p>
                <p>Address: {enteredAddress}</p>
                <p>Phone: {enteredPhone}</p>
            </Confirm>
            : (<form onSubmit={addPatientHandler}>
                <div>
                    <TextField
                        required
                        id="filled-required"
                        label="Name"
                        type="text" 
                        value={enteredName} 
                        onChange={nameChangeHandler}
                        size="small"
                        fullWidth
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="filled-required"
                        label="Address"
                        type="text" 
                        multiline
                        rows={4}
                        value={enteredAddress} 
                        onChange={addressChangeHandler}
                        size="small"
                        fullWidth
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="filled-required"
                        label="Phone Number"
                        type="number" 
                        value={enteredPhone} 
                        onChange={phoneChangeHandler}
                        size="small"
                        fullWidth
                    />
                </div>
                <Button variant="outlined" type="submit">Add Patient</Button>
            </form>)}
        </div>
    );
};

export default AddPatient;