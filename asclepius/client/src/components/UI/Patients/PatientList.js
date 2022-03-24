import React from 'react';
import './PatientList.css';

const PatiientList = (props) => {
    const assignedPatientsInfo = props.assignedPatientsInfo;

    return (
        <div>
            <h1>Assigned Patients</h1>
            <div className='patient-list-container'>
                {assignedPatientsInfo
                .map((patient) => {
                    return (
                        <div className='patientItem'>
                            <h4>Patient ID: {patient.patientID}, </h4>
                            <h4>Name:{patient.patientName}</h4>
                        </div>
                    );
                })}
                
            </div>
        </div>
    );
};

export default PatiientList;

