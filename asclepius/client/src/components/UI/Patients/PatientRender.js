import React, { useState, useEffect, useRef } from 'react';
import '../CommonUI.css';
import Patient from '../../patient/Patient';
import PatientList from "./PatientList";

const PatientRender = (props) => {
    const assignedPatientsInfo = props.assignedPatientsInfo;
    const [patientFile, setPatientFile] = useState(false);
    const patient = useRef("");

    const renderPatient = (p) => {
        setPatientFile(true);
        patient.current = p;
    }

    const MainComponentRender = () => {
        if (patientFile) {
            return <Patient patientFile={patient.current} />;
        }

        return <PatientList 
                    renderPatient={renderPatient} 
                    assignedPatientsInfo={props.assignedPatientsInfo} 
                    title={props.title ? props.title : ""} 
                />;

    }

    return (
        <div>
            <MainComponentRender />
        </div>
    );
}

export default PatientRender;