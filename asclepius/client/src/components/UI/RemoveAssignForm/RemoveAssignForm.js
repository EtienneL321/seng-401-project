import React from "react";
import { useState } from "react";
import { Button } from "@material-ui/core";
import Select from 'react-select';
import Confirm from "../Messages/Confirm";
import '../CommonUI.css';

const RemoveAssignForm = (props) => {

    const [ confirmState, setConfirmState ] = useState(false);
    const [ staffValue, setStaffValue ] = useState(props.staff[0].staffID);
    const [ patientValue, setPatientValue ] = useState('');

    const removeAssignmentHandler = (e) => {
        e.preventDefault();
        setConfirmState(true);
    };

    const confirmRemoveAssignment= () => {
        let assignmentData = {
            patientID: patientValue,
            careGiverID: staffValue
        }
        props.removeAssignment(assignmentData);
        setConfirmState(false);
    }

    const cancelRemoveAssignment = () => {
        setConfirmState(false);
    }

    return (
        <div className="remove-satff">
            <h2>Remove Assignment</h2>
            {confirmState ? 
            (<Confirm confirmHandler={confirmRemoveAssignment} cancelHandler={cancelRemoveAssignment}>
                <h2>Confirm Remove Assignment</h2>
                <p style={{color:'red'}}>***Are you sure you want to remove this assignment?***</p>
                <p>careGiverID: {staffValue}</p>
                <p>patientID: {patientValue}</p>
                <br />
            </Confirm>)
            : (<form onSubmit={removeAssignmentHandler}>
                <label>Select Care Giver:</label>
                <br />
                <Select
                    options={props.staff.map(s => ({label: s.Name, value: s.staffID}))}
                    onChange={(e) => {setStaffValue(e.value);}}
                    className = "select"
                />
                <br />
                <label>Select Patient:</label>
                <Select
                    options={props.assignments[staffValue].map(s => ({label: s.patientID, value: s.patientID}))}
                    onChange={(e) => setPatientValue(e.value)}
                    className = "select"
                />
                <br />
                <Button variant="outlined" type="submit">Remove Assignment</Button>
            </form>)}
        </div>
    );
};

export default RemoveAssignForm;