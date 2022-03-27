import React, { useState, useEffect, useRef } from 'react';
import '../CommonUI.css';
import Patient from '../../patient/Patient';


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
                            <button key={patient.patientID} className='patientItem' onClick={() => props.renderPatient(patient)}>
                                <h4>Patient ID: {patient.patientID}, </h4>
                                <h4>Name:{patient.patientName}</h4>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PatientList;

