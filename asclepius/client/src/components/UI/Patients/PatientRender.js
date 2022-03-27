import React, { useState, useEffect, useRef } from 'react';
import './PatientList.css';
import Patient from '../../patient/Patient';
import PatientList from "./PatientList";

const PatientRender = (props) => {
    const assignedPatientsInfo = props.assignedPatientsInfo;
    const [patientFile, setPatientFile] = useState(false);
    const patient = useRef("");

    const renderPatient = (p) => {
        setPatientFile(true);
        patient.current = p;
        console.log("Patient.current ", patient.current);
    }

    const MainComponentRender = () => {
        if (patientFile) {
            console.log("Now Patient.current ", patient.current);
            return <Patient patientFile={patient.current} />;
        }
        console.log(props.assignedPatientsInfo);

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