import React from 'react';
import './Pharmacist.css';
import { useState } from "react";
import AddMedication from './AddMedication';
import DeleteMedication from './DeleteMedication';
import Error from '../UI/Messages/Error';
import { Button } from "@material-ui/core";
import Success from '../UI/Messages/Success';

const AddDeleteMedication = ({ inventory, addMedication, deleteMedication, handleError, handleSuccess, successMessage, errorMessage}) => {
    const [addRemoveState, setAddRemoveState] = useState(true);

    return (
        <div className ="add-remove-btns">
            <h1>Add/Remove Medication</h1>
            <Button variant="contained" style={addRemoveState ? {backgroundColor:"lightblue"} : {backgroundColor:"lightgrey"}} onClick={() => {setAddRemoveState(true);}}>Add</Button>
            <Button variant="contained" style={addRemoveState ? {backgroundColor:"lightgrey"} : {backgroundColor:"lightblue"}} onClick={() => {setAddRemoveState(false);}}>Delete</Button>
            {addRemoveState ? 
                // Add Patient
                errorMessage ? 
                <Error handleError={handleError}>{errorMessage}</Error> 
                : successMessage ? 
                <Success handleSuccess={handleSuccess}>{successMessage}</Success> 
                : <AddMedication addMedication={addMedication} /> 

                // Remove Patient
                // : null
                : errorMessage ? 
                <Error handleError={handleError}>{errorMessage}</Error> 
                : successMessage ? 
                <Success handleSuccess={handleSuccess}>{successMessage}</Success> 
                :<DeleteMedication deleteMedication={deleteMedication} inventory={inventory}/>
                }
        </div>
    );
};

export default AddDeleteMedication;

