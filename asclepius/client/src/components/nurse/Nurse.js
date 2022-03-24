import React, { useState } from 'react';
import NavBar from '../UI/NavBar';
import '../home/HomePage.css';

const Nurse = (props) => {

    console.log(props.patients);

    return (
        <div className='MainApp'>
            <NavBar />
            <h1>Nurse</h1>
        </div>
        
    )
}

export default Nurse;