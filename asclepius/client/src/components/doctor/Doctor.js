import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import NavBar from '../UI/NavBar';
import useAuth from '../../hooks/useAuth';
import '../home/HomePage.css';
import '../CommonUser.css';
import PatientRender from '../UI/Patients/PatientRender';
import AssignMedication from './AssignMedication';
import ViewMedication from './ViewMedication';

const Doctor = (props) => {
    // console.log(props.patients);
    
    const { auth } = useAuth();
    const [staffInfo, setStaffInfo] = useState({});
    const [assignedPatientsInfo, setAssignedPatientsInfo] = useState([]);
    const [allMedication, setAllMedication] = useState([]);
    const [mainComponentState, setMainComonentState] = useState("patientListView");

    const [selectedPatient, setSelectedPatient] = useState(null);

    function MainComponentRender(props){
        const compState = props.compState;
        if (compState === "patientListView"){
            return <PatientRender assignedPatientsInfo={assignedPatientsInfo} staffInfo={staffInfo}/>
        } else if (compState === "orderMedication") {
            return <AssignMedication patients={assignedPatientsInfo} staffInfo={staffInfo} medication={allMedication}/>
        } else if (compState === "readyForPickup") {
            return <ViewMedication />
        }

        console.log(compState);
    }

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
    }, [auth]);

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