import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import NavBar from '../UI/NavBar';
import useAuth from '../../hooks/useAuth';
import '../home/HomePage.css';
import '../CommonUser.css';
import PatientRender from '../UI/Patients/PatientRender';
import AssignMedication from './AssignMedication';
import ViewMedication from './ViewMedication';
import Error from '../UI/Messages/Error';
import Success from '../UI/Messages/Success';

const Doctor = (props) => {
    // console.log(props.patients);
    
    const { auth } = useAuth();
    const [staffInfo, setStaffInfo] = useState({});
    const [assignedPatientsInfo, setAssignedPatientsInfo] = useState([]);
    const [allMedication, setAllMedication] = useState([]);
    const [mainComponentState, setMainComonentState] = useState("patientListView");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [ renderState, setRenderState ]= useState(true);

    function MainComponentRender(props){
        const compState = props.compState;
        if (compState === "patientListView"){
            return <PatientRender assignedPatientsInfo={assignedPatientsInfo} staffInfo={staffInfo}/>
        } else if (compState === "orderMedication") {
            return errorMessage ? 
            <Error handleError={handleError}>{errorMessage}</Error> 
            : successMessage ? 
            <Success handleSuccess={handleSuccess}>{successMessage}</Success> 
            : <AssignMedication patients={assignedPatientsInfo} staffInfo={staffInfo} medication={allMedication} addPrescription={handleAddPrescription}/>
        } else if (compState === "readyForPickup") {
            return <ViewMedication />
        }

        console.log(compState);
    }

    const handleAddPrescription = async (prescData) => {
        await axios.post("http://localhost:3001/api/post/prescriptions/new", prescData).then((response) => {
            console.log("This is the response from catch: ", response);
        }).then(() => {
            setSuccessMessage("Prescription order has been made!");
        }).catch((err) => {
            setErrorMessage(err.response.data.error);
        });
        setRenderState(!renderState);
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
                console.log("Response for the staff data", staffData.data[0]);
                setStaffInfo(staffData.data[0]);

                const assignedPatients = await axios.get('http://localhost:3001/api/get/staff/assignments/id', {params: staff});
                console.log("Response for the patients data", assignedPatients.data);
                setAssignedPatientsInfo(assignedPatients.data);

                const allMedication = await axios.get('http://localhost:3001/api/get/medications');
                setAllMedication(allMedication.data);
            }
            catch (error){
                console.error(error);
            }
        };
        fetchStaffAndPatients();
    }, [auth, renderState]);

    return (
        <div className='MainApp'>
            <NavBar />
            <div className='main-content-container'>
                <div className='user-sidebar'>
                    <h3>Hello, Doctor {staffInfo.Name}</h3>
                    <div className='navigation-btns-user'>
                        <button type="button" className='nav-btns' onClick={() => setMainComonentState("patientListView")}>
                            View Patients
                        </button>
                        <button type="button" className='nav-btns' onClick={() => setMainComonentState("orderMedication")}>
                            Order Patient Medication
                        </button>
                        <button type="button" className='nav-btns' onClick={() => setMainComonentState("readyForPickup")}>
                            Medication Ready for Pickup
                        </button>
                    </div>
                </div>
                
                <div className='main-page-content'>
                    <MainComponentRender compState={mainComponentState} />
                    {/* <PatientList assignedPatientsInfo={assignedPatientsInfo}/> */}
                </div>
            </div>
        </div>
        
    )
}

export default Doctor;