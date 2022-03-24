import React, { useState } from 'react';
import NavBar from '../UI/NavBar';
import '../home/HomePage.css';

const Administrator = (props) => {

    console.log(props.patients);

    return (
        <div className='MainApp'>
            <NavBar />
            <h1>Administrator</h1>
        </div>
        
    )
}

export default Administrator;