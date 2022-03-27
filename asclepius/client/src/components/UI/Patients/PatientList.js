import React, { useState, useEffect, useRef } from 'react';
import './PatientList.css';
import Patient from '../../patient/Patient';
import { Button } from "@material-ui/core";



const PatientList = (props) => {
    const assignedPatientsInfo = props.assignedPatientsInfo;

    return (
        <div>
            <div>
                <h1>{props.title ? props.title : "Assigned Patients"}</h1>
                <div className='patient-list-container'>
                    {assignedPatientsInfo
                    .map((patient) => {
                        return (
                            <Button variant="contained" key={patient.patientID} className='patientItem' onClick={() => props.renderPatient(patient)}>
                                <h3>Patient ID: {patient.patientID}, &nbsp;&nbsp;&nbsp; </h3>
                                <h3>Name:{patient.patientName}</h3>
                            </Button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PatientList;

