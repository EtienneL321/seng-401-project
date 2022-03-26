import { Button } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import Confirm from "../Messages/Confirm";
import Select from "react-select";

const AssignForm = (props) => {

    const [staffValue, setStaffValue] = useState(props.doctors[0].staffID);
    const [patientValue, setPatientValue] = useState(props.patients[0].patientID);
    const [confirmState, setConfirmState] = useState(false);

    const changeStaffRadio = (event) => {
        console.log(event.target.value);
        setStaffValue(event.target.value);
    };

    const confirmAssignment = () => {
        let assignment = {
            careGiverID: staffValue,
            patientID: patientValue, 
            assignerID: props.self.staffID,
        }
        console.log(assignment);
        props.getAssignments(assignment);
        setConfirmState(false);
    };

    const openConfirm = (e) => {
        e.preventDefault();
        setConfirmState(true);
    }

    const cancelAssignment = () => {
        setConfirmState(false);
    };

    return (
        <div>
            <h1>Assign Staff to Patient</h1>
            {confirmState ? 
            (<Confirm confirmHandler={confirmAssignment} cancelHandler={cancelAssignment}>
                <h2>Confirm Assignment</h2>
                <p>careGiverID: {staffValue}</p>
                <br />
                <p>patientID: {patientValue}</p>
                <br />
                <p>assignerID: {props.self.staffID}, assignerName: {props.self.Name}</p>
                <br />
            </Confirm>) : 
            (<form onSubmit={openConfirm}>
                <div className="staff-selection">
                    <h2>Staff Selection</h2>
                    <h3>Doctors</h3>
                    {props.doctors.map((d) => <label><input name="staff" type="radio" value={d.staffID} onChange={changeStaffRadio}/> {d.staffID + ", " + d.Name} <br /></label>)}
                    <h3>Nurses</h3>
                    {props.nurses.map((n) => <label><input name="staff" type="radio" value={n.staffID} onChange={changeStaffRadio}/> {n.staffID + ", " + n.Name} <br /></label>)}
                </div>
                <div className="patient-selection">
                    <h2>Patient Selection</h2>
                    <h3>Patients</h3>
                    <Select
                        options={props.patients.map(p => ({label: p.patientName, value: p.patientID}))}
                        onChange={(e) => setPatientValue(e.value)}
                    />
                </div>
                <Button variant="contained" type="submit">Assign</Button>
            </form>)}
        </div>
    )
};

export default AssignForm;