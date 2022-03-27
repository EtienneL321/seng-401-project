import React, { useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import './PatientList.css';
import { Divider } from '@material-ui/core';

const PatientList = (props) => {
    const assignedPatientsInfo = props.assignedPatientsInfo;

    const renderPatient = () => {
        console.log("Rendered patient");
    }

    return (
        <div>
            <h1>{props.title ? props.title : "Assigned Patients"}</h1>
            <div className='patient-list-container'>
                {assignedPatientsInfo
                .map((patient) => {
                    return (
                        <button key={patient.patientID} className='patientItem' onClick={renderPatient}>
                            <h4>Patient ID: {patient.patientID}, </h4>
                            <h4>Name:{patient.patientName}</h4>
                        </button>
                    );
                })}
                
            </div>
        </div>
    );
};

export default PatientList;

