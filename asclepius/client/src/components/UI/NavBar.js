import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link } from "react-router-dom";
import '../../App.css';

const NavBar = () => {
    return (
        <div className='nav-bar-container'>
            <AppBar position="static">
                <Toolbar>
                <Typography className='app-title-nav' variant="h6" noWrap>
                    <Link to='/home' className='home-btn-nav'>
                        Asclepius
                    </Link>
                </Typography>
                <div className='pages-nav-navbar'>
                    <Link to='/login' className='logout-btn-nav'>
                        <Button variant="outlined" color="secondary">
                            Logout
                        </Button>
                    </Link>
                </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavBar;

