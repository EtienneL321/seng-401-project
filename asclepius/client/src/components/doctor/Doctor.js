import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../UI/NavBar';
import useAuth from '../../hooks/useAuth';
import '../home/HomePage.css';
import '../CommonUser.css';
import PatientList from '../UI/Patients/PatientList';

const Doctor = (props) => {
    // console.log(props.patients);
    
    const { auth } = useAuth();
    const [staffInfo, setStaffInfo] = useState({});
    const [assignedPatientsInfo, setAssignedPatientsInfo] = useState([]);

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
            }
            catch (error){
                console.error(error);
            }
        };
        fetchStaffAndPatients();
    }, [auth])

    return (
        <div className='MainApp'>
            <NavBar />
            <div className='main-content-container'>
                <div className='user-sidebar'>
                    <h3>Hello, {staffInfo.Name}</h3>
                    <div className='navigation-btns-user'>
                        <button type="button" className='nav-btns'>
                            View Patients
                        </button>
                        <button type="button" className='nav-btns'>
                            Order Patient Medication
                        </button>
                        
                    </div>
                </div>
                
                <div className='main-page-content'>
                    <PatientList assignedPatientsInfo={assignedPatientsInfo}/>
                </div>
            </div>
        </div>
        
    )
}

export default Doctor;