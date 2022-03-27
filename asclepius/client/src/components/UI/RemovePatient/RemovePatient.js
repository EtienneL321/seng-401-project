import React from "react";
import { useState } from "react";
import { Button } from "@material-ui/core";
import Select from 'react-select';
import Confirm from "../Messages/Confirm";
import '../CommonUI.css';

const RemovePatient = (props) => {


    const [ confirmState, setConfirmState ] = useState(false);
    const [ patientValue, setPatientValue ] = useState(1001);

    const removePatientHandler = (e) => {
        e.preventDefault();
        setConfirmState(true);
    };

    const confirmRemovePatient = () => {
        let patientData = {
            patientID: patientValue
        }
        props.removePatient(patientData);
        setConfirmState(false);
    }

    const cancelRemovePatient = () => {
        setConfirmState(false);
    }

    return (
        <div className="remove-patient">
            <h2>Remove Patient</h2>
            {confirmState ? 
            (<Confirm confirmHandler={confirmRemovePatient} cancelHandler={cancelRemovePatient}>
                <h2>Confirm Remove Patient</h2>
                <p>patientID: {patientValue}</p>
                <br />
            </Confirm>)
            : (<form onSubmit={removePatientHandler}>
                <Select
                    options={props.patients.map(p => ({label: p.patientName, value: p.patientID}))}
                    onChange={(e) => setPatientValue(e.value)}
                    className = "select"
                />
                <Button variant="outlined" type="submit">Remove Patient</Button>
            </form>)}
        </div>
    );
};

export default RemovePatient;