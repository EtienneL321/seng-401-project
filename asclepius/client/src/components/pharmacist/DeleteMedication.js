import React from "react";
import { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import Select from 'react-select';
import Confirm from "../UI/Messages/Confirm";
import '../UI/CommonUI.css';

const DeleteMedication = (props) => {

    const [ confirmState, setConfirmState ] = useState(false);
    const [ medicationValue, setMedicationValue ] = useState(1001);

    const deleteMedicationHandler = (e) => {
        e.preventDefault();
        setConfirmState(true);
    };

    const confirmDeleteMedication = () => {
        let medicationData = {
            medicationID: medicationValue,
        }
        props.deleteMedication(medicationData);
        setConfirmState(false);
    }

    const cancelDeleteMedication = () => {
        setConfirmState(false);
    }

    return (
        <div className="remove-patient">
            <h2>Delete Medication</h2>
            {confirmState ? 
            (<Confirm confirmHandler={confirmDeleteMedication} cancelHandler={cancelDeleteMedication}>
                <h2>Confirm Delete Medication</h2>
                <p style={{color:'red'}}>***This also removes medication from the inventory***</p>
                <p>Medication ID: {medicationValue}</p>
                <br />
            </Confirm>)
            : (<form onSubmit={deleteMedicationHandler}>
                <Select
                    options={props.inventory.map(p => ({label: p.name, value: p.medicationID}))}
                    onChange={(e) => setMedicationValue(e.value)}
                    className = "select"
                />
                <Button variant="outlined" type="submit">Delete Medication</Button>
            </form>)}
        </div>
    );
};

export default DeleteMedication;