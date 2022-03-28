import React, { useState, useEffect, useRef } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import AddDiagnosis from './AddDiagnosis';
import AddNote from './AddNote';
import './Patient.css';
import '../home/HomePage.css';



const Patient = (props) => {

    const { auth } = useAuth();
    const [allStaff, setAllStaff] = useState([]);
    const [allMedication, setAllMedication] = useState([]);
    const [diagnoses, setDiagnoses] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [notes, setNotes] = useState([]);
    const [staffType, setStaffType] = useState([]);
    const buttonText = useRef("<- Back to Patient List");

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [ mainComponentState, setMainComonentState ] = useState("patientView");
    const [ renderState, setRenderState ]= useState(true);


    const MainComponentRender = (props) => {
        const compState = props.compState;
        if (compState === "addDiagnosis") {
            return (<AddDiagnosis addDiagnosis={addDiagnosis}/>)
        } else if (compState === "addNote") {
            return (<AddNote addNote={addNote}/>)
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
                                    <td>{allStaff.map(doc => {
                                        if (doc.staffID === d.doctorID)
                                            return (doc.Name)
                                     })}, </td>
                                </tr>
                            );
                        })}
                    </table>
                    
                    {/* Will add delete button later */}
                    <div className="buttons">
                        {staffType === "D" ? <button type="button" variant= "contained" onClick={() => {setMainComonentState("addDiagnosis")}}> Add Diagnosis</button> : null}
                    </div>

                    <table className="diagnoses-table">
                        <tr>
                            <th> Medication </th>
                            <th> Instructions </th>
                            <th> Amount </th>
                        </tr>
                        {prescriptions
                        .map(p => {
                            return (
                                <tr key={p.prescriptionID}>
                                    <td>{allMedication.map(med => {
                                        if (med.medicationID === p.medicationID)
                                            return (med.name)
                                    })}, </td>
                                    <td>{p.instructions}, </td>
                                    <td>{p.amount}, </td>
                                </tr>
                            );
                        })}
                    </table>

                    <div className="buttons">
<<<<<<< HEAD
                        { staffType === "A" ? null : <button type="button" variant= "contained" onClick={() => {setMainComonentState("addMedication")}}> Add Medication</button>}
=======
                        <button type="button" variant= "contained" onClick={() => {setMainComonentState("deleteMedication")}}> Delete Medication</button>
>>>>>>> 7b13562 (Layout for Medication Order)
                    </div>

                    <table className="diagnoses-table">
                        <tr>
                            <th> Created By </th>
                            <th> Notes </th>
                            <th> Date </th>
                        </tr>
                        {notes.slice(0, 5)
                        .map(n => {
                            return (
                                <tr key={n.noteID}>
                                    <td>{allStaff.map(doc => {
                                        if (doc.staffID === n.careGiverID)
                                            return (doc.Name)
                                     })}, </td>
                                    <td>{n.contents}, </td>
                                    <td>{n.dateTime.slice(0, 10)}, </td>
                                </tr>
                            );
                        })}
                    </table>

                     {/* Will add edit button later */}
                     <div className="buttons">
                        { staffType === "A" ? null : <button type="button" variant= "contained" onClick={() => {setMainComonentState("addNote")}}> Add Note</button>}
                    </div>
                </div>
            )
        }
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
                setDiagnoses(diagnosesData.data.reverse());

                const prescriptions = await axios.get('http://localhost:3001/api/get/prescriptions/patient',
                    { params: props.patientFile }
                );
                setPrescriptions(prescriptions.data);

                const notes = await axios.get('http://localhost:3001/api/get/medical_notes',
                    { params: props.patientFile }
                );
                setNotes(notes.data.reverse());

                const allStaff = await axios.get('http://localhost:3001/api/get/staff');
                setAllStaff(allStaff.data);

                const allMedication = await axios.get('http://localhost:3001/api/get/medications');
                setAllMedication(allMedication.data);
            }
            catch (error){
                console.error(error);
            }
        };
        fetchPatientInformation();
        setMainComonentState("patientView");
        setStaffType(props.staffInfo.staffType);
    }, [auth, renderState]);

    const addDiagnosis = async (newDiagnosis) => {
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

    const addNote = async (newNote) => {
        let today = new Date();
        let month = (today.getMonth() + 1 < 10) ? ('0' + (today.getMonth() + 1)) : (today.getMonth() + 1);
        let day = (today.getDate() < 10) ? ('0' + today.getDate()) : today.getDate();
        today = today.getFullYear() + '-' + month + '-' + day + ' ' + today.getHours() + ':' + today.getMinutes() + '.' + today.getSeconds();

        newNote.dateTime = today.toString();
        newNote.patientID = props.patientFile.patientID;
        newNote.careGiverID = props.staffInfo.staffID;

        console.log("Note added will be: ", newNote);
        await axios.post("http://localhost:3001/api/post/medical_notes/newnotes", newNote).then((response) => {
            console.log("This is the response from catch: ", response);
        }).then(() => {
            setSuccessMessage("Patient has been added!");
        }).catch((err) => {
            setErrorMessage(err.response.data.error);
        });
        setRenderState(!renderState);
    };

    const testFunction = () => {
        console.log("diagnoses", diagnoses);
        console.log("allStaff", allStaff);
        console.log("props.patientFile", props.patientFile);
        console.log("props.staffInfo",props.staffInfo);
        console.log("prescriptions", prescriptions);
        console.log("allMedication", allMedication);
        console.log("notes", notes);
    };

    const listRenderHandler = () => {
        props.renderList();
    }

    return (
        <div className="patient-file">
            <div className='patient-top'>
                <button type="button" variant= "contained" onClick={listRenderHandler}> {buttonText.current} </button>
                <h2 className='patient-name' onClick={testFunction}>Patient {props.patientFile.patientName}</h2>
                <h2 className='patient-id'>ID: {props.patientFile.patientID}</h2>
            </div>

            <MainComponentRender compState={mainComponentState}/>
        </div>
    )
}

export default Patient;