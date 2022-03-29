import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import NavBar from '../UI/NavBar';
import useAuth from '../../hooks/useAuth';
import '../home/HomePage.css';
import '../CommonUser.css';
import PatientRender from '../UI/Patients/PatientRender';
import AssignMedication from '../doctor/AssignMedication';
import PickupMedication from '../doctor/PickupMedication';
import MedicationPickupList from '../doctor/MedicationPickupList';
import Error from '../UI/Messages/Error';
import Success from '../UI/Messages/Success';

const Nurse = (props) => {
    
    const { auth } = useAuth();
    const [staffInfo, setStaffInfo] = useState({});
    const [assignedPatientsInfo, setAssignedPatientsInfo] = useState([]);
    const [allMedication, setAllMedication] = useState([]);
    const [requestedPrescriptions, setRequestedPrescriptions] = useState([]);
    const [mainComponentState, setMainComponentState] = useState("patientListView");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [renderState, setRenderState]= useState(true);
    const [selectedPresc, setSelectedPresc] = useState({});

    function showPickUpMedication(prescription){
        setSelectedPresc(prescription);
        setMainComponentState("pickUpOrder");
        setRenderState(prev => !prev);
    }

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
            return <MedicationPickupList prescriptions={requestedPrescriptions} showPickUpMedication={showPickUpMedication}/>
        }
        else if(compState === "pickUpOrder"){
            return <PickupMedication presc={selectedPresc} handlePickupOrder={handlePickupOrder}/>
        }
    }

    const handleAddPrescription = async (prescData) => {
        await axios.post("http://localhost:3001/api/post/prescriptions/new", prescData).then((response) => {
            console.log("Got prescriptions");
        }).then(() => {
            setSuccessMessage("Prescription order has been made!");
        }).catch((err) => {
            setErrorMessage(err.response.data.error);
        });
        setRenderState(!renderState);
    };

    const handlePickupOrder = async (prescData) => {
        let date = new Date();
        const currTime = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()+ " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        let prescriptionParams = {
            receiverID : staffInfo.staffID,
            time: currTime,
            prescriptionID: prescData.prescriptionID,
        };
        //update the precription
        await axios.put("http://localhost:3001/api/put/prescriptions/info/docnurse", prescriptionParams);
        alert("Medication has been picked up!");
        setRenderState(prev => !prev);
        // return to pickup page
        setMainComponentState("readyForPickup");

    };

    const handleError = () => {
        setErrorMessage("");
    };

    const handleSuccess = () => {
        setSuccessMessage("");
    };

    useEffect(() => {
        const fetchStaffAndPatients = async () => {
            let staff = {
                staffID : auth.id,
            }
            try {
                const staffData = await axios.get('http://localhost:3001/api/get/staff/info/id', {params: staff});
                setStaffInfo(staffData.data[0]);

                const assignedPatients = await axios.get('http://localhost:3001/api/get/staff/assignments/id', {params: staff});
                setAssignedPatientsInfo(assignedPatients.data);

                const allMedication = await axios.get('http://localhost:3001/api/get/medications');
                setAllMedication(allMedication.data);

                const requestedPrescriptions = await axios.get('http://localhost:3001/api/get/prescriptions/reqid', {params: staff});
                setRequestedPrescriptions(requestedPrescriptions.data);
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
                    <h3>Hello, Nurse {staffInfo.Name}</h3>
                    <div className='navigation-btns-user'>
                        <button type="button" className='nav-btns' onClick={() => setMainComponentState("patientListView")}>
                            View Patients
                        </button>
                        <button type="button" className='nav-btns' onClick={() => setMainComponentState("orderMedication")}>
                            Order Patient Medication
                        </button>
                        <button type="button" className='nav-btns' onClick={() => setMainComponentState("readyForPickup")}>
                            Medication Ready for Pickup
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

export default Nurse;