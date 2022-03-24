import React, { useState } from 'react';
import NavBar from '../UI/NavBar';
import '../home/HomePage.css';

const Doctor = (props) => {

    console.log(props.patients);

    return (
        <div className='MainApp'>
            <NavBar />
            <h1>Doctor</h1>
        </div>
        
    )
}

export default Doctor;