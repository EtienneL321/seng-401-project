import React from "react";
import { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import Confirm from "../UI/Messages/Confirm";
import '../UI/CommonUI.css';

const AddMedication = (props) => {

    const [confirmState, setConfirmState ] = useState(false);
    const [enteredName, setEnteredName] = useState('');
    const [enteredClearanceNum, setEnteredClearanceNum] = useState(0);
    const [enteredUse, setEnteredUse] = useState('');
    const [enteredWarnings, setEnteredWarnings] = useState('');
    const [enteredStock, setEnteredStock] = useState(0);

    const nameChangeHandler = (e) => {
        setEnteredName(e.target.value);
    };

    const cleanranceChangeHandler = (e) => {
        setEnteredClearanceNum(e.target.value);
    };

    const useChangeHandler = (e) => {
        setEnteredUse(e.target.value);
    };

    const warningsChangeHandler = (e) => {
        e.preventDefault();
        setEnteredWarnings(e.target.value);
    };

    const stockChangeHandler = (e) => {
        setEnteredStock(e.target.value);
    };

    const addMedicationHandler = (e) => {
        e.preventDefault();
        setConfirmState(true);
    };

    const confirmAddMedication = () => {
        let newMedication = {
            name: enteredName,
            clearanceNum: enteredClearanceNum,
            use: enteredUse,
            warnings: enteredWarnings,
            stock: enteredStock,
        }
        props.addMedication(newMedication);
        setConfirmState(false);
    };

    const cancelAddMedication = () => {
        setConfirmState(false);
    };

    return (
        <div className="add-patient">
            <h2>Add Medication</h2>
            {confirmState ? 
            <Confirm confirmHandler={confirmAddMedication} cancelHandler={cancelAddMedication}>
                <h2>Confirm Add Medication</h2>
                <p>Name: {enteredName}</p>
                <p>Clearance Level: {enteredClearanceNum}</p>
                <p>Use: {enteredUse}</p>
                <p>Warnings: {enteredWarnings}</p>
                <p>Initial Stock: {enteredStock}</p>
            </Confirm>
            : (<form onSubmit={addMedicationHandler}>
                <div>
                    <TextField
                        required
                        id="filled-required"
                        label="Medication Name"
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
                        label="Clearance Level"
                        type="number" 
                        value={enteredClearanceNum} 
                        onChange={cleanranceChangeHandler}
                        size="small"
                        fullWidth
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="filled-required"
                        label="Use"
                        type="text" 
                        value={enteredUse} 
                        onChange={useChangeHandler}
                        size="small"
                        fullWidth
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="filled-required"
                        label="Warnings"
                        type="text" 
                        value={enteredWarnings} 
                        onChange={warningsChangeHandler}
                        size="small"
                        fullWidth
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="filled-required"
                        label="Initial Stock"
                        type="text" 
                        value={enteredStock} 
                        onChange={stockChangeHandler}
                        size="small"
                        fullWidth
                    />
                </div>
                <Button variant="contained" type="submit">Add Medication</Button>
            </form>)}
        </div>
    );
};

export default AddMedication;