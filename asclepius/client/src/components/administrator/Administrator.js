import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import NavBar from '../UI/NavBar';
import PatientList from '../UI/Patients/PatientList';
import axios from 'axios';
import { Button } from '@material-ui/core';
import '../home/HomePage.css';
import './Administrator.css';
import AssignForm from '../UI/AssignForm/AssignForm';
import AddPatient from '../UI/AddPatient/AddPatient';
import RemovePatient from '../UI/RemovePatient/RemovePatient';
import Error from '../UI/Messages/Error';
import Success from '../UI/Messages/Success';

const Administrator = (props) => {

    const { auth } = useAuth();
    const [staffInfo, setStaffInfo] = useState({});
    const [allPatients, setAllPatients] = useState([]);
    const [allDoctors, setAllDoctors] = useState([]);
    const [allNurses, setAllNurses] = useState([]);
    const [addRemoveState, setAddRemoveState] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [ mainComponentState, setMainComonentState ] = useState("patientListView");
    const [ renderState, setRenderState ]= useState(true);

    function MainComponentRender(props){
        const compState = props.compState;
        if(compState === "patientListView"){
            return <PatientList title={"All patients"} assignedPatientsInfo={allPatients}/>
        }

        if(compState === "addRemovePatient"){
            return (
                <div>
                    <h1>Add/Remove Patient</h1>
                    <Button variant="contained" style={addRemoveState ? {backgroundColor:"lightblue"} : {backgroundColor:"lightgrey"}} onClick={() => {setAddRemoveState(true);}}>Add</Button>
                    <Button variant="contained" style={addRemoveState ? {backgroundColor:"lightgrey"} : {backgroundColor:"lightblue"}} onClick={() => {setAddRemoveState(false);}}>Remove</Button>
                    {addRemoveState ? 
                        // Add Patient
                        errorMessage ? 
                        <Error handleError={handleError}>{errorMessage}</Error> 
                        : successMessage ? 
                        <Success handleSuccess={handleSuccess}>{successMessage}</Success> 
                        : <AddPatient addPatient={addPatient} /> 

                        // Remove Patient
                        : errorMessage ? 
                        <Error handleError={handleError}>{errorMessage}</Error> 
                        : successMessage ? 
                        <Success handleSuccess={handleSuccess}>{successMessage}</Success> 
                        :<RemovePatient removePatient={removePatient} patients={allPatients}/>}
                </div>
            );
        }

        if(compState === "assignStaff"){
            return errorMessage ? <Error handleError={handleError}>{errorMessage}</Error>  : successMessage ? <Success handleSuccess={handleSuccess}>{successMessage}</Success> : 
            (<AssignForm getAssignments={makeAssignment} doctors={allDoctors} nurses={allNurses} patients={allPatients} self={staffInfo}/>);
        }
    }

    const handleError = () => {
        console.log("this is from error handling: ", errorMessage);
        setErrorMessage("");
    };

    const handleSuccess = () => {
        console.log("this is from success handling: ", successMessage);
        setSuccessMessage("");
    };

    useEffect(() => {
        const fetchStaffAndPatients = async () => {
            let staff = {
                staffID : auth.id,
            }
            try {
                const staffData = await axios.get('http://localhost:3001/api/get/staff/info/id', {params: staff});
                // console.log("Response for the staff data", staffData.data[0]);
                setStaffInfo(staffData.data[0]);

                const allDoctors = await axios.get('http://localhost:3001/api/get/staff/doctors');
                // console.log("Response for the all doctors", allDoctors.data);
                setAllDoctors(allDoctors.data);

                const allNurses = await axios.get('http://localhost:3001/api/get/staff/nurses');
                // console.log("Response for the all nurses", allNurses.data);
                setAllNurses(allNurses.data);

                const allPatients = await axios.get('http://localhost:3001/api/get/patients');
                // console.log("Response for the patients data", allPatients.data);
                setAllPatients(allPatients.data);
            }
            catch (error){
                console.error(error);
            }
        };
        fetchStaffAndPatients();
    }, [auth, renderState]);

    const makeAssignment = async (assignment) => {
        console.log(assignment);
        await axios.post("http://localhost:3001/api/post/staff/assignment", assignment).then((response) => {
            console.log("This is the response from catch: ", response);
        }).then(() => {
            setSuccessMessage("Assignment has been made!");
        }).catch((err) => {
            setErrorMessage(err.response.data.error);
        });

    };

    const addPatient = async (patientData) => {
        console.log("This is from administrator ", patientData);
        await axios.post("http://localhost:3001/api/post/patients/newpatient", patientData).then((response) => {
            console.log("This is the response from catch: ", response);
        }).then(() => {
            setSuccessMessage("Patient has been added!");
        }).catch((err) => {
            setErrorMessage(err.response.data.error);
        });
        setRenderState(!renderState);
    }

    const removePatient = async (patientData) => {
        console.log("This is from administrator ", patientData);
        await axios.delete("http://localhost:3001/api/delete/patients/remove", {params : patientData}).then((response) => {
            console.log("This is the response from catch: ", response);
        }).then(() => {
            setSuccessMessage("Patient has been removed!");
        }).catch((err) => {
            setErrorMessage(err.response.data.error);
        });
        setRenderState(!renderState);
    }

    return (
        <div className='MainApp'>
            <NavBar />
            <div className='main-content-container'>
                <div className='user-sidebar'>
                    <h3>Hello, Administrator {staffInfo.Name}</h3>
                    <div className='navigation-btns-user'>
                        <button type="button" onClick={() => {setMainComonentState("patientListView")}} className='nav-btns'>
                            View All Patients
                        </button>
                        <button type="button" onClick={() => {setMainComonentState("addRemovePatient");}} className='nav-btns'>
                            Add/Remove Patient
                        </button>
                        <button type="button" onClick={() => {setMainComonentState("assignStaff");}} className='nav-btns'>
                            Assign Staff to Patients
                        </button>
                        <Link to='/pharmacist'>
                            <button type="button" className='nav-btns'>
                                Pharmacist Page
                            </button>
                        </Link>
                    </div>
                </div>
                <div className='main-page-content'>
                    <MainComponentRender compState={mainComponentState} />
                </div>
            </div>
        </div>
        
    )
}

export default Administrator;