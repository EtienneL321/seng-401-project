import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import NavBar from '../UI/NavBar';


const Patient = (props) => {

    console.log("Patient is: ", props.patientFile);

    return (
        <div className='MainApp'>
            <div className='main-page-content'>
                <h2>Hello World!</h2>
            </div>
        </div>
    )
}

export default Patient;