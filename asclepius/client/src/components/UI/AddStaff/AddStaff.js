import React from "react";
import { useState } from "react";
import { Button } from "@material-ui/core";
import Select from 'react-select';
import Confirm from "../Messages/Confirm";
import '../CommonUI.css';

const AddStaff = (props) => {

    const [ confirmState, setConfirmState ] = useState(false);
    const [enteredStaffType, setEnteredStaffType] = useState('');
    const [enteredClearanceLevel, setEnteredClearanceLevel] = useState('');
    const [keyGenerated, setKeyGenerated] = useState('');

    const addStaffHandler = (e) => {
        e.preventDefault();
        generateKey();
    };

    const confirmAddStaff = () => {
        props.addStaff();
        setConfirmState(false);
    }

    const cancelAddStaff = () => {
        setConfirmState(false);
    }

    const generateKey = () => {
        let authAssignedKey = (Math.floor(1000 + Math.random() * 9000)).toString();
        let keyBuilder = "00"+enteredStaffType+"-"+enteredClearanceLevel+"-"+authAssignedKey;
        setKeyGenerated(keyBuilder);
        setConfirmState(true);
    }

    return (
        <div className="add-staff">
            <h2>Generate Key For New Staff</h2>
            {confirmState ? 
            <Confirm confirmHandler={confirmAddStaff} cancelHandler={cancelAddStaff}>
                <h2>Confirm Generate Key</h2>
                <p>staffType: {enteredStaffType}</p>
                <p>staffClearanceLevel: {enteredClearanceLevel}</p>
                <p>generatedKey: {keyGenerated}</p>
            </Confirm>
            : (<form onSubmit={addStaffHandler}>
                <div>
                    <label>Select Staff Type:</label>
                    <Select
                        options={[{staffRole: "Doctor", staffType: "1"},{staffRole: "Nurse", staffType: "2"},{staffRole: "Pharmacist", staffType: "3"},{staffRole: "Administrator", staffType: "4"}].map(s => ({label: s.staffRole, value: s.staffType}))}
                        onChange={(e) => setEnteredStaffType(e.value)}
                        className = "select"
                    />
                    <br />
                    <label>Select Staff Clearance Level:</label>
                    <Select
                        options={["1","2","3","4","5"].map(s => ({label: s, value: s}))}
                        onChange={(e) => setEnteredClearanceLevel(e.value)}
                        className = "select"
                    />
                    <br />
                </div>
                <Button variant="outlined" type="submit">Generate Key</Button>
            </form>)}
        </div>
    );
};

export default AddStaff;