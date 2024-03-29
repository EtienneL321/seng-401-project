import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import NavBar from '../UI/NavBar';
import PatientRender from '../UI/Patients/PatientRender';
import axios from 'axios';
import { Button } from '@material-ui/core';
import '../home/HomePage.css';
import './Administrator.css';
import AssignForm from '../UI/AssignForm/AssignForm';
import AddPatient from '../UI/AddPatient/AddPatient';
import RemoveStaff from '../UI/RemoveStaff/RemoveStaff';
import AddStaff from '../UI/AddStaff/AddStaff';
import RemovePatient from '../UI/RemovePatient/RemovePatient';
import RemoveAssignForm from '../UI/RemoveAssignForm/RemoveAssignForm';
import Error from '../UI/Messages/Error';
import Success from '../UI/Messages/Success';
import InventoryList from '../pharmacist/InventoryList';

const Administrator = (props) => {

    const { auth } = useAuth();
    const [staffInfo, setStaffInfo] = useState({});
    const [allPatients, setAllPatients] = useState([]);
    const [allStaff, setAllStaff] = useState([]);
    const [allDoctors, setAllDoctors] = useState([]);
    const [allNurses, setAllNurses] = useState([]);
    const [allAssignmnets, setAllAssignments] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [addRemoveState, setAddRemoveState] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [ mainComponentState, setMainComonentState ] = useState("patientListView");
    const [ renderState, setRenderState ]= useState(true);

    function MainComponentRender(props){
        const compState = props.compState;
        if(compState === "patientListView"){
            return <PatientRender title={"All patients"} assignedPatientsInfo={allPatients} staffInfo={staffInfo}/>
        }else if (compState === "inventoryView"){
            return <InventoryList inventoryInfo={inventory}/>;
        }else if(compState === "addRemovePatient"){
            return (
                <div className ="add-remove-btns">
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
        }else if(compState === "addRemoveStaff"){
            return (
                <div className ="add-remove-btns">
                    <h1>Add/Remove staff</h1>
                    <Button variant="contained" style={addRemoveState ? {backgroundColor:"lightblue"} : {backgroundColor:"lightgrey"}} onClick={() => {setAddRemoveState(true);}}>Add</Button>
                    <Button variant="contained" style={addRemoveState ? {backgroundColor:"lightgrey"} : {backgroundColor:"lightblue"}} onClick={() => {setAddRemoveState(false);}}>Remove</Button>
                    {addRemoveState ? 
                        // Add Staff
                        errorMessage ? 
                        <Error handleError={handleError}>{errorMessage}</Error> 
                        : successMessage ? 
                        <Success handleSuccess={handleSuccess}>{successMessage}</Success> 
                        : <AddStaff addStaff={addStaff} /> 

                        // Remove Staff
                        : errorMessage ? 
                        <Error handleError={handleError}>{errorMessage}</Error> 
                        : successMessage ? 
                        <Success handleSuccess={handleSuccess}>{successMessage}</Success> 
                        :<RemoveStaff removeStaff={removeStaff} staff={allStaff}/>}
                </div>
            );
        }else if(compState === "assignStaff"){
            return errorMessage ? <Error handleError={handleError}>{errorMessage}</Error>  : successMessage ? <Success handleSuccess={handleSuccess}>{successMessage}</Success> : 
            (<AssignForm getAssignments={makeAssignment} doctors={allDoctors} nurses={allNurses} patients={allPatients} self={staffInfo}/>);
        }else if(compState === "removeAssignStaff"){

            let staffAssignments = {};
            for(let i of [...allDoctors, ...allNurses]){
                staffAssignments[i.staffID] = [];
            }

            for(let i of allAssignmnets){
                staffAssignments[i.careGiverID].push(i);
            }

            return errorMessage ? <Error handleError={handleError}>{errorMessage}</Error>  : successMessage ? <Success handleSuccess={handleSuccess}>{successMessage}</Success> : 
            (<RemoveAssignForm removeAssignment={removeAssignment} assignments={staffAssignments} staff={[...allDoctors, ...allNurses]}/>);
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

                const allStaff = await axios.get('http://localhost:3001/api/get/staff');
                // console.log("Response for the all staff", allStaff.data);
                setAllStaff(allStaff.data);

                const allDoctors = await axios.get('http://localhost:3001/api/get/staff/doctors');
                // console.log("Response for the all doctors", allDoctors.data);
                setAllDoctors(allDoctors.data);

                const allNurses = await axios.get('http://localhost:3001/api/get/staff/nurses');
                // console.log("Response for the all nurses", allNurses.data);
                setAllNurses(allNurses.data);

                const allPatients = await axios.get('http://localhost:3001/api/get/patients');
                // console.log("Response for the patients data", allPatients.data);
                setAllPatients(allPatients.data);

                const allAssignments = await axios.get('http://localhost:3001/api/get/assignments');
                // console.log("Response for the assignments data", allAssignment.data);
                setAllAssignments(allAssignments.data);

                const inventoryData = await axios.get('http://localhost:3001/api/get/inventory');
                // console.log("Response for inventory", inventoryData.data);
                setInventory(inventoryData.data);
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
        setRenderState(!renderState);

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

    const addStaff = () => {
        setSuccessMessage("New staff key has been generated!");
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

    const removeStaff = async (staffData) => {
        console.log("This is from administrator ", staffData);
        await axios.delete("http://localhost:3001/api/delete/staff/remove", {params : staffData}).then((response) => {
            console.log("This is the response from catch: ", response);
        }).then(() => {
            setSuccessMessage("Staff has been removed!");
        }).catch((err) => {
            setErrorMessage(err.response.data.error);
        });
        setRenderState(!renderState);
    }

    const removeAssignment = async (assignmentData) => {
        console.log("This is from administrator ", assignmentData);
        await axios.delete("http://localhost:3001/api/delete/assignments/remove", {params : assignmentData}).then((response) => {
            console.log("This is the response from catch: ", response);
        }).then(() => {
            setSuccessMessage("Assignment has been removed!");
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
                        <button type="button" onClick={() => {setMainComonentState("addRemoveStaff");}} className='nav-btns'>
                            Add/Remove Staff
                        </button>
                        <button type="button" onClick={() => {setMainComonentState("assignStaff");}} className='nav-btns'>
                            Assign Staff to Patients
                        </button>
                        <button type="button" onClick={() => {setMainComonentState("removeAssignStaff");}} className='nav-btns'>
                            Remove Assignments
                        </button>
                        <button type="button" onClick={() => {setMainComonentState("inventoryView");}} className='nav-btns'>
                            View Pharmacy Inventory
                        </button>
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