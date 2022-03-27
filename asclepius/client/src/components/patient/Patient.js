import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Patient = () => {

    return (
        <div className='MainApp'>
            <NavBar />
            <div className='main-content-container'>
                <div className='user-sidebar'>
                    <h3>Hello, Doctor {staffInfo.Name}</h3>
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
                    <h2>Hello World!</h2>
                </div>
            </div>
        </div>
    )
}

export default Patient;