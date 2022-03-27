import React from "react";
import { useState } from "react";
import { Button } from "@material-ui/core";
import Select from 'react-select';
import Confirm from "../Messages/Confirm";
import '../CommonUI.css';

const RemoveStaff = (props) => {


    const [ confirmState, setConfirmState ] = useState(false);
    const [ staffValue, setStaffValue ] = useState(1001);

    const removeStaffHandler = (e) => {
        e.preventDefault();
        setConfirmState(true);
    };

    const confirmRemoveStaff = () => {
        let staffData = {
            staffID: staffValue
        }
        props.removeStaff(staffData);
        setConfirmState(false);
    }

    const cancelRemoveStaff = () => {
        setConfirmState(false);
    }

    return (
        <div className="remove-satff">
            <h2>Remove Staff</h2>
            {confirmState ? 
            (<Confirm confirmHandler={confirmRemoveStaff} cancelHandler={cancelRemoveStaff}>
                <h2>Confirm Remove Staff</h2>
                <p style={{color:'red'}}>***Are you sure you want to remove this employee?*** <br />***Removing a staff removes all their assignments as well.***</p>
                <p>staffID: {staffValue}</p>
                <br />
            </Confirm>)
            : (<form onSubmit={removeStaffHandler}>
                <label>Select Employee:</label>
                <br />
                <Select
                    options={props.staff.map(s => ({label: s.Name, value: s.staffID}))}
                    onChange={(e) => setStaffValue(e.value)}
                    className = "select"
                />
                <br />
                <Button variant="outlined" type="submit">Remove Staff</Button>
            </form>)}
        </div>
    );
};

export default RemoveStaff;