import React, { useState, useEffect, useRef } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import AddDiagnosis from './AddDiagnosis';
import './Patient.css';
import '../home/HomePage.css';



const Patient = (props) => {

    const { auth } = useAuth();
    const [diagnoses, setDiagnoses] = useState([]);
    const [allDoctors, setAllDoctors] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [ mainComponentState, setMainComonentState ] = useState("patientView");
    const [ renderState, setRenderState ]= useState(true);


    const MainComponentRender = (props) => {
        const compState = props.compState;
        if (compState === "addDiagnosis") {
            return (<AddDiagnosis addDiagnosis={addDiagnosis}/>)
        } else if (compState === "patientView") {
            return (
                <div className='patient-info'>
                    <table className="diagnoses-table">
                        <tr>
                            <th> Diagnosis </th>
                            <th> Comments </th>
                            <th> Date</th>
                            <th> Created By </th>
                        </tr>
                        {diagnoses.slice(0, 3)
                        .map(d => {
                            return (
                                <tr key={d.diagnosisID}>
                                    <td>{d.name}, </td>
                                    <td>{d.comments}, </td>
                                    <td>{d.date.slice(0, 10)}, </td>
                                    <td>{allDoctors.map(doc => {
                                        if (doc.staffID === d.doctorID)
                                            return (doc.Name)
                                     })}, </td>
                                </tr>
                            );
                        })}
                    </table>
                    
                    {/* Will add delete button late */}
                    <div className="buttons">
                        <button type="button" variant= "contained" onClick={() => {setMainComonentState("addDiagnosis")}}> Add Diagnosis</button>
                    </div>

                    <div>
                        Assigned Medication
                    </div>
                    <div>
                        Medical Notes
                    </div>
                </div>
            )
        }

        testFunction();
    };

    const handleError = () => {
        console.log("this is from error handling: ", errorMessage);
        setErrorMessage("");
    };

    const handleSuccess = () => {
        console.log("this is from success handling: ", successMessage);
        setSuccessMessage("");
    };

    useEffect(() => {
        const fetchPatientInformation = async () => {
            try {
                const diagnosesData = await axios.get('http://localhost:3001/api/get/diagnoses',
                    { params: props.patientFile }
                );
                // console.log("Response for the diagnoses", diagnosesData);
                setDiagnoses(diagnosesData.data.reverse());
                // setMainComponentState("ordersView");

                const allDoctors = await axios.get('http://localhost:3001/api/get/staff/doctors');
                // console.log("Response for the all doctors", allDoctors.data);
                setAllDoctors(allDoctors.data);
            }
            catch (error){
                console.error(error);
            }
        };
        fetchPatientInformation();
        setMainComonentState("patientView");
    }, [auth, renderState]);

    const testFunction = () => {
        console.log("diagnoses", diagnoses);
        console.log("allDoctors", allDoctors);
        console.log("props.patientFile", props.patientFile);
        console.log("props.staffInfo",props.staffInfo);
    };

    const addDiagnosis = async (newDiagnosis) => {
        testFunction();
        let today = new Date();
        let month = (today.getMonth() + 1 < 10) ? ('0' + (today.getMonth() + 1)) : (today.getMonth() + 1);
        let day = (today.getDate() < 10) ? ('0' + today.getDate()) : today.getDate();
        today = today.getFullYear() + '-' + month + '-' + day + ' ' + today.getHours() + ':' + today.getMinutes() + '.' + today.getSeconds();

        newDiagnosis.date = today.toString();
        newDiagnosis.patientID = props.patientFile.patientID;
        newDiagnosis.doctorID = props.staffInfo.staffID;

        console.log("Diagnosis added will be: ", newDiagnosis);
        await axios.post("http://localhost:3001/api/post/diagnoses/newdiagnoses", newDiagnosis).then((response) => {
            console.log("This is the response from catch: ", response);
        }).then(() => {
            setSuccessMessage("Patient has been added!");
        }).catch((err) => {
            setErrorMessage(err.response.data.error);
        });
        setRenderState(!renderState);
    };

    return (
        <div >
            <div className='patient-top'>
                <h2 className='patient-name'>Patient {props.patientFile.patientName}</h2>
                <h2 className='patient-id'>ID: {props.patientFile.patientID}</h2>
            </div>

            <MainComponentRender compState={mainComponentState}/>
        </div>
    )
}

export default Patient;