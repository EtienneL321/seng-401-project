import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import NavBar from '../UI/NavBar';
import './HomePage.css';

const HomePage = (props) => {

    console.log(props.patients);

    return (
        <div className='MainApp'>
            <NavBar />
            <h1>UNAUTHORIZED</h1>
        </div>
        
    )
}

export default HomePage;