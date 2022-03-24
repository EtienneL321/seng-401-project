import React, { useState } from 'react';
import NavBar from '../UI/NavBar';
import '../home/HomePage.css';

const Pharmacist = (props) => {

    console.log(props.patients);

    return (
        <div className='MainApp'>
            <NavBar />
            <h1>Pharmacist</h1>
        </div>
        
    )
}

export default Pharmacist;